import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'
import { FlattenMaps } from 'mongoose'
import { Config } from '~/config/configuration'
import { UserDocument } from '~/database/users/user.schema'
import { UserRepository } from '~/database/users/user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async validateUser(
    email: string,
    password: string
  ): Promise<FlattenMaps<Omit<UserDocument, 'password'>>> {
    const user = await this.userRepository.findUserByEmail(email)
    if (user) {
      const isPasswordValid = await compare(password, user.password)

      if (!isPasswordValid) {
        return null
      }

      const userJson = user.toJSON()
      const { password: _password, ...result } = userJson
      return result
    }
    return null
  }

  async sign(user: FlattenMaps<Omit<UserDocument, 'password'>>) {
    const payload = { email: user.email, sub: user._id }
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

      const user = await this.userRepository.findUserByEmail(payload.email)
      if (!user) {
        return new UnauthorizedException()
      }

      return this.sign(user)
    } catch (error) {
      return new BadRequestException(error.message)
    }
  }
}
