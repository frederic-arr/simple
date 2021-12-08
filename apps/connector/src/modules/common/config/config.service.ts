import { Injectable } from '@nestjs/common';
import { DB_APP_NAME } from './constants';

type Environment = 'development';

@Injectable()
export class ConfigService {
  readonly environment: Environment = loadEnvironment();
  readonly mongodbUri: string = loadMongodbUri();
  readonly typesenseUri: string = loadTypesenseUri();
  readonly typesenseApiKey: string = loadTypesenseApiKey();
  readonly typesenseReadOnlyApiKey: string = loadTypesenseReadOnlyApiKey();
  readonly mongodbAppName = DB_APP_NAME;
}

/**
 * Loads the environment
 */
function loadEnvironment(): Environment {
  if (!process.env.ENVIRONMENT) throw new Error('ENVIRONMENT is not defined');
  if (!process.env.ENVIRONMENT.match(/^development|production$/))
    throw new Error('ENVIRONMENT is invalid');

  return process.env.ENVIRONMENT as Environment;
}

/**
 * Loads the mongodb connection uri
 */
function loadMongodbUri() {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not defined');

  return process.env.MONGODB_URI;
}

/**
 * Loads the typesense host uri
 */
function loadTypesenseUri() {
  if (!process.env.TYPESENSE_URI)
    throw new Error('TYPESENSE_URI is not defined');

  return process.env.TYPESENSE_URI;
}

/**
 * Loads the typesense api key
 */
function loadTypesenseApiKey() {
  if (!process.env.TYPESENSE_API_KEY)
    throw new Error('TYPESENSE_API_KEY is not defined');

  return process.env.TYPESENSE_API_KEY;
}

/**
 * Loads the typesense search client api key
 * It's not very safe but eh, it's secure enough for the scope of this project
 */
function loadTypesenseReadOnlyApiKey() {
  if (!process.env.TYPESENSE_API_KEY_READ_ONLY)
    throw new Error('TYPESENSE_API_KEY_READ_ONLY is not defined');

  return process.env.TYPESENSE_API_KEY_READ_ONLY;
}
