import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Config } from '~/config/configuration'
import { UserDBService } from '~/database/users/user.service'
import { UserFactory } from '~/modules/user/user.factory'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserDBService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<Config['JWT_SECRET']>('JWT_SECRET'),
    })
  }

  async validate(payload: any) {
    const user = await this.userService.findUserByEmail(payload.email)
    if (!user) {
      return new UnauthorizedException()
    }

    return UserFactory.createFromDatabase(user)
  }
}
