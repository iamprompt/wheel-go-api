import { registerEnumType } from '@nestjs/graphql'
import { ROUTE_TYPES } from '~/const/routeTypes'
import { STATUS } from '~/const/status'
import { ROLES } from '~/const/userRoles'

registerEnumType(STATUS, {
  name: 'STATUS',
  description: 'Status of the document',
  valuesMap: {
    DRAFT: {
      description: 'Draft (not published)',
    },
    PUBLISHED: {
      description: 'Published',
    },
    DELETED: {
      description: 'Deleted',
    },
  },
})

registerEnumType(ROUTE_TYPES, {
  name: 'ROUTE_TYPES',
  description: 'Type of the route',
  valuesMap: {
    PRE_DEFINED: {
      description: 'Pre-defined route',
    },
    TRACED: {
      description: 'Traced route',
    },
  },
})

registerEnumType(ROLES, {
  name: 'ROLES',
  description: 'Roles of the user',
  valuesMap: {
    ADMIN: {
      description: 'Admin',
    },
    USER: {
      description: 'User',
    },
  },
})
