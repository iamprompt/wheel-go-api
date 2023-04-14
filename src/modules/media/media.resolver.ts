import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { Media } from './media.schema'
import { MediaService } from './media.service'

@Resolver()
export class MediaResolver {
  constructor(private readonly mediaService: MediaService) {}

  @Query(() => [Media])
  async getMedia(): Promise<Media[]> {
    return this.mediaService.getMedia()
  }

  @Query(() => Media)
  async getMediaById(
    @Args('id', { type: () => String }) id: string
  ): Promise<Media> {
    return this.mediaService.getMediaById(id)
  }

  @Mutation(() => Media)
  async uploadMedia(
    @Args('file', { type: () => GraphQLUpload }) file: FileUpload
  ): Promise<Media> {
    return this.mediaService.uploadMedia(file)
  }
}
