/*
 * Projet: StreamGuide API
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Security guard
 * Version: 2021-12-01
 */

import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SecurityService } from './security.service';
import { FastifyRequest } from 'fastify';
import { API_KEY_HEADER } from './security.constants';

@Injectable()
export class SecurityGuard implements CanActivate {
  private readonly _apiKeyHeader = API_KEY_HEADER.toLowerCase();
  public constructor(
    @Inject(SecurityService) private readonly _securityService: SecurityService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const key = request.headers[this._apiKeyHeader];
    if (key === undefined || Array.isArray(key))
      throw new UnauthorizedException({ message: 'No API key provided' });

    const isValid = await this._securityService.isValidApiKey(key);
    if (!isValid)
      throw new UnauthorizedException({ message: 'Invalid API key' });

    return await this._securityService.isAuthorizedApiKey(key);
  }
}
