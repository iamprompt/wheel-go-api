import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { User } from '~/modules/user/user.schema'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context)
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    if (!roles) {
      return true
    }
    const {
      req: { user },
    } = ctx.getContext<{
      req: {
        user: User
      }
    }>()
    const hasRole = roles.includes(user.role)

    if (!hasRole) {
      throw new HttpException('Forbidden', 403)
    }

    return true
  }
}
