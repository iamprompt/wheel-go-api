import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { AuthModule } from '~/modules/auth/auth.module'
import { UserModule } from '~/modules/user/user.module'

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async () => ({
        autoSchemaFile: 'schema.gql',
      }),
    }),
    AuthModule,
    UserModule,
  ],
})
export class WGGraphQLModule {}
