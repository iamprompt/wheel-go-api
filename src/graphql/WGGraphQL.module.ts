import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { AuthModule } from '~/modules/auth/auth.module'
import { PlaceModule } from '~/modules/place/place.module'
import { UserModule } from '~/modules/user/user.module'
import { MediaModule } from '~/modules/media/media.module'

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async () => ({
        autoSchemaFile: 'schema.gql',
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        context: ({ req }) => ({ req }),
        csrfPrevention: false,
      }),
    }),
    AuthModule,
    UserModule,
    PlaceModule,
    MediaModule,
  ],
})
export class WGGraphQLModule {}
