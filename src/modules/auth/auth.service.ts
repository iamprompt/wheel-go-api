import { Injectable } from '@nestjs/common'
import { UserDBService } from '~/database/users/user.service'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserDBService) {}

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
