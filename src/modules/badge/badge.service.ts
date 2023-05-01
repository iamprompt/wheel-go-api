import { Injectable } from '@nestjs/common'
import { Badge } from './badge.schema'
import { BadgeFactory } from './badge.factory'
import { CreateBadgeInput } from './dto/createBadge.dto'
import { BadgeRepository } from '~/database/mongo.service'

@Injectable()
export class BadgeService {
  constructor(private readonly badgeRepository: BadgeRepository) {}

  async find(): Promise<Badge[]> {
    const badges = await this.badgeRepository.find()

    return BadgeFactory.createFromDatabase(badges)
  }

  async findById(id: string): Promise<Badge | undefined> {
    const badge = await this.badgeRepository.findById(id)

    return BadgeFactory.createFromDatabase(badge)
  }

  async create(payload: CreateBadgeInput): Promise<Badge | undefined> {
    const badge = await this.badgeRepository.create(
      BadgeFactory.createToSave(payload)
    )

    return BadgeFactory.createFromDatabase(badge)
  }

  async update(
    id: string,
    payload: CreateBadgeInput
  ): Promise<Badge | undefined> {
    const badge = await this.badgeRepository.update(
      id,
      BadgeFactory.createToSave(payload)
    )

    return BadgeFactory.createFromDatabase(badge)
  }

  async delete(id: string): Promise<Badge | undefined> {
    const badge = await this.badgeRepository.delete(id)

    return BadgeFactory.createFromDatabase(badge)
  }
}
