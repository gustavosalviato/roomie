import { makeCreateRoomController } from '@/infra/factories/controllers/make-create-room-controller'
import { makeEditRoomController } from '@/infra/factories/controllers/make-edit-room-controller'

import { FastifyInstance } from 'fastify'

export async function roomRoutes(app: FastifyInstance) {
  app.post('/rooms', makeCreateRoomController())
  app.put('/rooms/:roomId', makeEditRoomController())
}
