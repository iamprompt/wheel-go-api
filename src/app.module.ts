import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { WGGraphQLModule } from './graphql/WGGraphQL.module'

@Module({
  imports: [WGGraphQLModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
