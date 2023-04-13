import { Injectable } from '@nestjs/common'
import { UserDBService } from '~/database/users/user.service'

@Injectable()
export class UserService {
  constructor(private readonly userService: UserDBService) {}

  getHello(): string {
    return 'Hello World! from UserService'
  }
}
