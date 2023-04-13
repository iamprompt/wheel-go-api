import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import { Config } from './config/configuration'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)

  await app.listen(configService.get<Config['PORT']>('PORT'))
}
bootstrap()
