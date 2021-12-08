/*
 * Projet: StreamGuide API
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Configuration service
 * Version: 2021-12-01
 */

/* eslint-disable @typescript-eslint/consistent-type-assertions */
// ! ENV always returns a string or undefined so we need to enable type asserts

import { Injectable } from '@nestjs/common';
import { DEFAULT_PORT, APP_NAME } from './constants';
import { Environment } from './config.interface';

/**
 * Loads the environment
 *
 * @returns The environment variable
 */
function loadEnvironment(): Environment {
  if (process.env['ENVIRONMENT'] === undefined)
    throw new Error('ENVIRONMENT is not defined');
  if (!/^development|production$/u.exec(process.env['ENVIRONMENT']))
    throw new Error('ENVIRONMENT is invalid');

  return process.env['ENVIRONMENT'] as Environment;
}

/**
 * Loads the mongodb connection uri
 *
 * @returns The mongodb connection URI
 */
function loadMongodbUri(): string {
  if (process.env['MONGODB_URI'] === undefined)
    throw new Error('MONGODB_URI is not defined');

  return process.env['MONGODB_URI'];
}

/**
 * Loads the typesense host uri
 *
 * @returns The Typesense URI
 */
function loadTypesenseUri(): string {
  if (process.env['TYPESENSE_URI'] === undefined)
    throw new Error('TYPESENSE_URI is not defined');

  return process.env['TYPESENSE_URI'];
}

/**
 * Loads the typesense api key
 *
 * @returns The Typesense API key
 */
function loadTypesenseApiKey(): string {
  if (process.env['TYPESENSE_API_KEY'] === undefined)
    throw new Error('TYPESENSE_API_KEY is not defined');

  return process.env['TYPESENSE_API_KEY'];
}

/**
 * Loads the http port
 *
 * @returns The http port
 */
export function loadHttpPort(): number {
  if (process.env['HTTP_PORT'] === undefined) return DEFAULT_PORT;

  const p = parseInt(process.env['HTTP_PORT'], 10);
  if (Number.isNaN(p)) throw new Error('HTTP_PORT is invalid');

  // Port p must be an integer in range [0..65535] (inclusive) according to the IANA
  if (p < 0 || p > 65_535 || Math.round(p) !== p)
    throw new Error('HTTP_PORT is invalid');

  return p;
}

@Injectable()
export class ConfigService {
  public readonly environment: Environment = loadEnvironment();
  public readonly mongodbUri: string = loadMongodbUri();
  public readonly typesenseUri: string = loadTypesenseUri();
  public readonly typesenseApiKey: string = loadTypesenseApiKey();
  public readonly mongodbAppName: string = APP_NAME;
}
