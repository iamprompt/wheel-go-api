import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as Modules from '~/modules'

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [ConfigModule],
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: async (_configService: ConfigService) => ({
        autoSchemaFile: 'schema.gql',
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        context: ({ req }) => ({ req }),
        csrfPrevention: false,
      }),
    }),
    ...Object.values(Modules),
  ],
})
export class WGGraphQLModule {}
