import { Injectable } from '@nestjs/common'
import { CreateActivityLogInput } from './activityLog/createActivityLog.dto'
import { ActivityLogFactory } from './activityLog.factory'
import { ActivityLogRepository } from '~/database/mongo.service'

@Injectable()
export class ActivityLogService {
  constructor(private readonly activityLogRepository: ActivityLogRepository) {}

  async find() {
    return this.activityLogRepository.find()
  }

  async findById(id: string) {
    return this.activityLogRepository.findById(id)
  }

  async findByUserId(userId: string) {
    return this.activityLogRepository.findByUserId(userId)
  }

  async findByActivityType(activityType: string) {
    return this.activityLogRepository.findByActivityType(activityType)
  }

  async create(activityLog: CreateActivityLogInput, userId: string) {
    const activityLogToSave = ActivityLogFactory.createToSave(
      activityLog,
      userId
    )

    return this.activityLogRepository.create(activityLogToSave)
  }
}
