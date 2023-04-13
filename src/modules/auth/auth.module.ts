import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { WGMongoModule } from '~/database/WGMongo.module'
import { Config } from '~/config/configuration'

@Module({
  imports: [
    ConfigModule,
    WGMongoModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<Config['JWT_SECRET']>('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
    }),
  ],
  providers: [AuthResolver, AuthService, ConfigService],
})
export class AuthModule {}
