/*
 * Projet: StreamGuide API
 * Author: Arroyo Frédéric<frederic.arr@eduge.ch>
 * Description: Media controller
 * Version: 2021-12-01
 */

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { IMedia, IMediaList } from './media.interface';
import { HealthGuard } from '../../common/health/health.guard';
import { SecurityGuard } from '../../common/security';

// The health guard makes sure that the service on wich the media service depends are available, if they are not, stops and returns a 503
@Controller('data/medias')
@UseGuards(HealthGuard)
export class MediaController {
  public constructor(private readonly _dataService: MediaService) {}

  /**
   * Gets a list of all medias
   *
   * @param query - The search query (fuzzy matching on the title). Use `*` for everything (or leave empty)
   * @param page - The page
   * @param limit - The number of result per page
   * @returns A list of medias with their title, id, and image
   */
  @Get()
  public async findMany(
    @Query('q') query?: string,
    @Query('p') page?: string,
    @Query('n') limit?: string,
  ): Promise<IMediaList> {
    return this._dataService.findManyMedias(
      query,
      page === undefined ? page : Number(page),
      limit === undefined ? limit : Number(limit),
    );
  }

  /**
   * Get details of a specific media
   *
   * @param id - The id of the media
   * @returns the details of the media
   */
  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<IMedia> {
    const media = await this._dataService.findMediaById(id);
    return media;
  }

  /**
   * Insrts a media in the database
   *
   * @param data - The media object to be inserted
   * @returns An object containing the id of the isnerted media
   */
  @Post()
  @UseGuards(SecurityGuard)
  public async createMedia(@Body() data: IMedia): Promise<{ id: string }> {
    const id = await this._dataService.insertMedia(data);
    return { id };
  }

  /**
   * Deletes a media by its id
   *
   * @param id - The id of the media to be deleted
   * @returns The operation result
   */
  @Delete(':id')
  @UseGuards(SecurityGuard)
  public async deleteMediaById(
    @Param('id') id: string,
  ): Promise<{ isSuccess: boolean }> {
    const isSuccess = await this._dataService.deleteMediaById(id);
    return { isSuccess };
  }

  /**
   * Fully replaces a media representation by the body of the request
   *
   * @param id - The id of the media to be replaced
   * @param data - The replacement media
   * @returns The operation result
   */
  @Put(':id')
  @UseGuards(SecurityGuard)
  public async replaceMediaById(
    @Param('id') id: string,
    @Body() data: IMedia,
  ): Promise<{ isSuccess: boolean }> {
    const isSuccess = await this._dataService.replaceMediaById(id, data);
    return { isSuccess };
  }

  // TODO: Add a PATCH operation
}
