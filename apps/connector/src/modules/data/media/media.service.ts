import { Injectable, Inject } from '@nestjs/common';
import { ConfigService, DbService } from '../../common';
import { ChangeStreamDocument, ObjectId } from 'mongodb';
import { TypesenseService } from '../../../modules/common/typesense';
import * as data from '../../../assets/data.json';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { DB_COLLECTION, TS_KEY_NAME, TS_NAME } from '../../common/config/constants';

@Injectable()
export class MediaService {
  constructor(
    private readonly dbService: DbService,
    private readonly typesenseService: TypesenseService,
    private readonly configService: ConfigService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    this._init();
    this.logger.defaultMeta = {
      context: 'MediaService',
    };
  }

  private _healthy = false;

  /**
   * Checks if the media service is ready
   * @returns is the media service ready
   */
  async isHealthy() {
    return this._healthy;
  }

  /**
   * Starts the initalization routine:
   * - Populate the database
   * - Created the search API key
   * - Populate the search index
   */
  private async _init() {
    await this._populateMongodbCollection();
    await this._createTypesenseApiKey();
    await this._createTypesenseCollection();
  }

  /**
   * Checks if we have a `SEARCH_CLIENT` API key and creates it if not
   * ! This function does not perform any sort of permission checking so if the key exists with * permissions it won't be created
   */
  private async _createTypesenseApiKey() {
    const client = await this.typesenseService.client;
    const { keys } = await client.keys().retrieve();

    const key = keys.find(({ description }) =>
      description?.startsWith(TS_KEY_NAME),
    );

    this.logger.info(
      `Typesense Search Client API Key: ${key ? 'OK' : 'Creating'}`,
    );
    if (!key) {
      await client.keys().create({
        actions: ['documents:search'],
        collections: [TS_NAME],
        description: TS_KEY_NAME,
        value: this.configService.typesenseReadOnlyApiKey,
      });
    }
  }

  /**
   * Checks if the Typesense collection exists and if not, create it with its schema
   */
  private async _createTypesenseCollection() {
    const client = await this.typesenseService.client;
    const collections = await client.collections().retrieve();

    const collection = collections.find(({ name }) => name === TS_NAME);
    this.logger.info(`Typesense Collection: ${collection ? 'OK' : 'Creating'}`);
    if (!collection) {
      await client.collections().create({
        name: TS_NAME,
        fields: [
          { name: 'id', type: 'string', index: true },
          { name: 'name', type: 'string', index: true },
        ],
      });
    }
    await this._populateTypesenseCollection();
    await this._monitorSourceCollection();
  }

  /**
   * Checks if the MongoDB collection has any documents in it and if not, load them from the json
   */
  private async _populateMongodbCollection() {
    const db = await this.dbService.database;
    const collection = db.collection(DB_COLLECTION);
    const count = await collection.countDocuments();

    this.logger.info(`MongoDB Collection: ${count > 0 ? 'OK' : 'Creating'}`);
    if (count > 0) return;

    await collection.insertMany(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (<any[]>data).map((doc) => ({ ...doc, _id: new ObjectId(doc._id.$oid) })),
    );
  }

  /**
   * Checks if the Typesense index has any documents in it and if not, load them from the database
   */
  private async _populateTypesenseCollection() {
    const client = await this.typesenseService.client;
    const collection = client.collections(TS_NAME);
    const collectionData = await collection.retrieve();

    this.logger.info(
      `Typesense Index: ${
        collectionData.num_documents > 0 ? 'OK' : 'Creating'
      }`,
    );
    if (collectionData.num_documents > 0) return;

    const BATCH_SIZE = 950;
    const db = await this.dbService.database;
    const cursor = db
      .collection(DB_COLLECTION)
      .find({})
      .project<{ _id: ObjectId; name: string }>({ _id: 1, name: 1 })
      .limit(BATCH_SIZE);

    // It might take some time with large batch size
    let documents = await cursor.toArray();
    for (let i = 0; documents.length !== 0; i++) {
      for (const document of documents) {
        collection.documents().upsert({
          id: document._id.toHexString(),
          name: document.name,
        });
      }

      this.logger.info(
        `Indexed: ${i * BATCH_SIZE + documents.length} documents...`,
      );

      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2_500);
      });

      documents = await db
        .collection(DB_COLLECTION)
        .find({})
        .project<{ _id: ObjectId; name: string }>({ _id: 1, name: 1 })
        .limit(BATCH_SIZE)
        .skip(i * BATCH_SIZE)
        .toArray();
    }
  }

  /**
   * Updates a document in the search index when we update the database
   * @param next Mongodb document
   */
  private async _updateTypesenseDocument(next: ChangeStreamDocument) {
    const client = await this.typesenseService.client;
    switch (next.operationType) {
      case 'update': {
        if (!next.updateDescription?.updatedFields?.name) return;
        await client
          .collections(TS_NAME)
          // ! Wrong typedef in mongodb
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          .documents(next.documentKey._id)
          .update({
            name: next.updateDescription?.updatedFields?.name,
          });
        break;
      }
      case 'replace':
      case 'insert': {
        if (!next.fullDocument?.name) return;
        await client.collections(TS_NAME).documents().upsert({
          // ! Wrong typedef in mongodb
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          id: next.documentKey._id,
          name: next.fullDocument.name,
        });
        break;
      }
      case 'delete': {
        await client
          .collections(TS_NAME)
          // ! Wrong typedef in mongodb
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          .documents(<string>next.documentKey._id)
          .delete();
        break;
      }
    }
  }

  /**
   * Monitor the database
   * ! Only works on replica sets
   */
  private async _monitorSourceCollection() {
    this.logger.info('Watching for database changes');
    const db = await this.dbService.database;
    const changeStream = db.collection(DB_COLLECTION).watch();
    changeStream.on('change', (next) => {
      this._updateTypesenseDocument(next);
    });
    this._healthy = true;
  }
}
