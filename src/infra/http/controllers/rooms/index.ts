import { makeCreateRoomController } from '@/infra/factories/controllers/make-create-room-controller'

import { FastifyInstance } from 'fastify'

export async function roomRoutes(app: FastifyInstance) {
  app.post('/rooms', makeCreateRoomController())
}
