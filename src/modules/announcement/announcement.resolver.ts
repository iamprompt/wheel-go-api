import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { User } from '../user/user.schema'
import { AnnouncementService } from './announcement.service'
import { Announcement } from './announcement.schema'
import { CreateAnnouncementInput } from './dto/createAnnouncement.dto'
import { CurrentUser } from '~/decorators/currentUser.decorator'
import { GqlAuthGuard } from '~/guards/GqlAuthGuard'
import { RolesGuard } from '~/guards/RolesGuard'
import { HasRoles } from '~/decorators/hasRoles.decorator'
import { ActiveLang } from '~/decorators/activeLang.decorator'

@Resolver()
export class AnnouncementResolver {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Query(() => [Announcement])
  async getAnnouncements(@ActiveLang() lang: string) {
    return this.announcementService.findAllAnnouncements(lang)
  }

  @Query(() => Announcement)
  async getAnnouncementById(
    @Args('id', { type: () => String }) id: string,
    @ActiveLang() lang: string
  ) {
    return this.announcementService.findAnnouncementById(id, lang)
  }

  @Mutation(() => Announcement)
  @HasRoles('ADMIN')
  @UseGuards(GqlAuthGuard, RolesGuard)
  async createAnnouncement(
    @Args('data') data: CreateAnnouncementInput,
    @CurrentUser() user: User,
    @ActiveLang() lang: string
  ) {
    return this.announcementService.createAnnouncement(data, user.id, lang)
  }

  @Mutation(() => Announcement)
  @HasRoles('ADMIN')
  @UseGuards(GqlAuthGuard, RolesGuard)
  async updateAnnouncement(
    @Args('id', { type: () => String }) id: string,
    @Args('data') data: CreateAnnouncementInput,
    @CurrentUser() user: User,
    @ActiveLang() lang: string
  ) {
    return this.announcementService.updateAnnouncement(id, data, user.id, lang)
  }
}
