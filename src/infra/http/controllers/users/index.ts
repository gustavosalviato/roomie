import { makeAuthenticateUserController } from '@/infra/factories/controllers/make-authenticate-user-controller'
import { makeRegisterUserController } from '@/infra/factories/controllers/make-register-user-controller'

import { FastifyInstance } from 'fastify'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', makeRegisterUserController())
  app.post('/sessions', makeAuthenticateUserController())
}
