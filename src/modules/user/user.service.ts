import { Injectable } from '@nestjs/common'
import { UserDBService } from '~/database/users/user.service'

@Injectable()
export class UserService {
  constructor(private readonly userService: UserDBService) {}

  getHello(): string {
    return 'Hello World! from UserService'
  }

  async login(email: string, password: string): Promise<boolean> {
    const user = await this.userService.findUserByEmail(email)
    if (!user) {
      return false
    }

    if (user.password === password) {
      return true
    }
    return false
  }
}
