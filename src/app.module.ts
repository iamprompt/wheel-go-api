import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { WGGraphQLModule } from './graphql/WGGraphQL.module'
import { WGConfigModule } from './config/WGConfig.module'
import { WGMongoModule } from './database/WGMongo.module'

@Module({
  imports: [WGGraphQLModule, WGConfigModule, WGMongoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
