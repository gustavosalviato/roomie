import { makeCreatePeriodController } from '@/infra/factories/controllers/make-create-period-controller'

import { FastifyInstance } from 'fastify'

export async function periodRoutes(app: FastifyInstance) {
  app.post('/rooms/:roomId/periods', makeCreatePeriodController())
}
