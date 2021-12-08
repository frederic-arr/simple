/*
 * Projet: StreamGuide API
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Media DTO
 * Version: 2021-12-01
 */

import { BadRequestException } from '@nestjs/common';
import { IsUrl, Length, validate } from 'class-validator';
import {
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
  MIN_SYNOPSIS_LENGTH,
  MAX_SYNOPSIS_LENGTH,
} from './media.constants';
import { IMedia } from './media.interface';
import { IsUrlInWhitelist } from './media.validator';

/** Data Tranfer Object for POST/PUT/PATCH */
type TMediaDto = IMedia;

/** Data Tranfer Object class validator for POST/PUT/PATCH */
export class MediaDto implements TMediaDto {
  @Length(MIN_NAME_LENGTH, MAX_NAME_LENGTH)
  public readonly name: string;

  @Length(MIN_SYNOPSIS_LENGTH, MAX_SYNOPSIS_LENGTH)
  public readonly synopsis: string;

  @IsUrlInWhitelist({ isSecure: true, domains: ['m.media-amazon.com'] })
  public readonly image: string;

  @IsUrl({ protocols: ['https'] }, { each: true })
  public readonly links: string[];
}

export async function validateMediaDto(data: unknown): Promise<MediaDto> {
  const dto = Object.assign(new MediaDto(), data);
  const errors = await validate(dto, {
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    whitelist: true,
  });
  if (errors.length > 0)
    throw new BadRequestException({ message: '`body` failed validation' });

  return dto;
}
