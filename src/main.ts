import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { graphqlUploadExpress } from 'graphql-upload'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { Config } from './config/configuration'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))

  const configService = app.get(ConfigService)

  await app.listen(configService.get<Config['PORT']>('PORT'))
}
bootstrap()
