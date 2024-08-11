import { makeRegisterUserController } from '@/infra/factories/controllers/make-register-user-controller'

import { FastifyInstance } from 'fastify'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', makeRegisterUserController())
}
