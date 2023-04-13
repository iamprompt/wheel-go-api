import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { WGConfigModule } from 'src/config/WGConfig.module'
import { Config } from 'src/config/configuration'

@Module({
  imports: [
    WGConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<Config['MONGO_URI']>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class WGMongoModule {}
