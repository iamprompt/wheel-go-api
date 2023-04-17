import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'
import { UserFactory } from '../user/user.factory'
import { User } from '../user/user.schema'
import { Config } from '~/config/configuration'
import { UserRepository } from '~/database/users/user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email)
    if (user) {
      const isPasswordValid = await compare(password, user.password)

      if (!isPasswordValid) {
        return null
      }

      return UserFactory.createFromDatabase(user)
    }
    return null
  }

  async sign(user: User) {
    const payload = { email: user.email, sub: user.id }
    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: '15m',
        secret: this.configService.get<Config['JWT_SECRET']>('JWT_SECRET'),
      }),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '7d',
        secret:
          this.configService.get<Config['JWT_REFRESH_SECRET']>(
            'JWT_REFRESH_SECRET'
          ),
      }),
    }
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret:
          this.configService.get<Config['JWT_REFRESH_SECRET']>(
            'JWT_REFRESH_SECRET'
          ),
      })

      const user = await this.userRepository.findByEmail(payload.email)
      if (!user) {
        return new UnauthorizedException()
      }

      const formattedUser = UserFactory.createFromDatabase(user)
      return this.sign(formattedUser)
    } catch (error) {
      return new BadRequestException(error.message)
    }
  }
}
