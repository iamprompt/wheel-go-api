import { Module } from '@nestjs/common'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'
import { WGMongoModule } from '~/database/WGMongo.module'

@Module({
  imports: [WGMongoModule],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
