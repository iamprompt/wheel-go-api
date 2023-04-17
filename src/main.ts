import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { graphqlUploadExpress } from 'graphql-upload'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { Config } from './config/configuration'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const configService = app.get(ConfigService)

  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))

  await app.listen(configService.get<Config['PORT']>('PORT'))
}
bootstrap()
