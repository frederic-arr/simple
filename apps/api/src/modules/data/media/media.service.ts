/*
 * Projet: StreamGuide API
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Media service
 * Version: 2021-12-01
 */

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from '../../common';
import { ObjectId } from 'mongodb';
import { IMedia, IMediaList, IMediaListItem } from './media.interface';
import { TypesenseService } from '../../common/typesense';
import { DB_COLLECTION, TS_NAME } from '../../common/config/constants';
import { MediaDto, validateMediaDto } from './media.dto';
import {
  DEFAULT_PAGE,
  DEFAULT_LIMIT,
  MAX_QUERY_LENGTH,
  MIN_PAGE,
  MAX_LIMIT,
  MAX_SPECULATIVE_TOTAL,
  CACHE_SEARCH_RESULT_FOR_SECONDS,
} from './media.constants';

/**
 * Indexed search document
 */
interface ISearchDocument {
  /** Hex-string representation of the ObjectID */
  id: string;
}

/**
 * Helper function to check if a document is of the given type
 *
 * @param doc - Any document
 * @returns Is the provided document an {@link ISearchDocument}
 */
function isSearchDocument(
  doc: ISearchDocument | unknown,
): doc is ISearchDocument {
  return (
    typeof doc === 'object' &&
    doc !== null &&
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    typeof (doc as ISearchDocument).id === 'string'
  );
}

@Injectable()
export class MediaService {
  public constructor(
    private readonly _dbService: DbService,
    private readonly _typesenseService: TypesenseService,
  ) {}
  /**
   * Gets a list of media corresponding to the search query
   *
   * @param query - search query that will be fuzzy matched
   * @param page - page number
   * @param limit - how many item shall be returned
   * @returns array of simplified medias
   */
  public async findManyMedias(
    query: string = '*',
    page: number = DEFAULT_PAGE,
    limit: number = DEFAULT_LIMIT,
  ): Promise<IMediaList> {
    if (limit === 0) return { medias: [] };
    if (query.length > MAX_QUERY_LENGTH)
      throw new BadRequestException({
        message: `The lenght of \`query.q\` must be no greater than ${MAX_QUERY_LENGTH}`,
      });
    if (Number.isNaN(page))
      throw new BadRequestException({
        message: `\`query.p\` must be a number`,
      });
    if (Number.isNaN(limit))
      throw new BadRequestException({
        message: `\`query.n\` must be a number`,
      });
    if (page < MIN_PAGE)
      throw new BadRequestException({
        message: `\`query.p\` cannot be smaller than ${MIN_PAGE}`,
      });
    if (limit < 1 || limit > MAX_LIMIT)
      throw new BadRequestException({
        message: `\`query.n\` must be in range [1..${MAX_LIMIT}]`,
      });
    // Given the goal of the website, no one should do that so we just silently dissalow it
    if ((page + 1) * limit > MAX_SPECULATIVE_TOTAL)
      return {
        medias: [],
      };

    // This probably not the most efficient method it spares us the complicated task of migrating the Typesense schema
    const { client } = this._typesenseService;
    const collection = client.collections<ISearchDocument>(TS_NAME);
    const search = await collection.documents().search(
      {
        q: query || '*',
        query_by: 'name',
        include_fields: 'id',
        page,
        per_page: limit,
      },
      {
        cacheSearchResultsForSeconds: CACHE_SEARCH_RESULT_FOR_SECONDS,
      },
    );

    // Cleaning up the results a bit in case the schema changes
    const hits = Array.isArray(search.hits) ? search.hits : [];
    const cleanedHits = hits
      .map(({ document }) => document)
      .filter(isSearchDocument);
    const ids = cleanedHits.map((doc) => new ObjectId(doc.id));

    // Getting the media data from the DB
    const db = this._dbService.database;
    const docs = await db
      .collection(DB_COLLECTION)
      .find({
        _id: {
          $in: ids,
        },
      })
      .project<IMediaListItem>({
        _id: 0,
        id: '$_id',
        name: 1,
        image: 1,
      })
      .toArray();

    return { medias: docs };
  }

  /**
   * Find a media from its id
   *
   * @param id - media's id
   * @returns media if found, null otherwise
   */
  public async findMediaById(id: string): Promise<IMedia> {
    if (!ObjectId.isValid(id))
      throw new BadRequestException({
        message: '`path.id` must be a valid object id',
      });

    const db = this._dbService.database;
    const doc = await db.collection(DB_COLLECTION).findOne<IMedia>(
      { _id: new ObjectId(id) },
      {
        projection: {
          _id: 0,
          name: 1,
          synopsis: 1,
          image: 1,
          links: 1,
        },
      },
    );

    if (doc === null) throw new NotFoundException({});
    return doc;
  }

  /**
   * Insert a media in the Database
   *
   * @param data - body to create
   * @returns object id of the created media
   */
  public async insertMedia(data: MediaDto): Promise<string> {
    const dto = await validateMediaDto(data);

    const db = this._dbService.database;
    const res = await db.collection(DB_COLLECTION).insertOne(dto);
    return res.insertedId.toHexString();
  }

  /**
   * Deletes a media by its id
   *
   * @param id - the media id
   * @returns has the media been deleted
   */
  public async deleteMediaById(id: string): Promise<boolean> {
    if (!ObjectId.isValid(id))
      throw new BadRequestException({
        message: '`path.id` must be a valid object id',
      });

    const db = this._dbService.database;
    const res = await db
      .collection(DB_COLLECTION)
      .deleteOne({ _id: new ObjectId(id) });

    return res.deletedCount === 1;
  }

  /**
   * Replaces a media by its id
   *
   * @param id - the media id
   * @param data - the new media object
   * @returns has the media been replaced
   */
  public async replaceMediaById(id: string, data: IMedia): Promise<boolean> {
    const dto = await validateMediaDto(data);

    if (!ObjectId.isValid(id))
      throw new BadRequestException({
        message: '`path.id` must be a valid object id',
      });

    const db = this._dbService.database;
    const res = await db.collection(DB_COLLECTION).updateOne(
      { _id: new ObjectId(id) },
      {
        $set: dto,
      },
    );

    return res.matchedCount === 1;
  }
}
