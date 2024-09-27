import { makeCancelReservationController } from '@/infra/factories/controllers/make-cancel-reservation-controller'
import { makeCreateReservationController } from '@/infra/factories/controllers/make-create-reservation'
import { makeFetchUserReservationsController } from '@/infra/factories/controllers/make-fetch-user-reservation-controller'

import { FastifyInstance } from 'fastify'

export async function reservationRoutes(app: FastifyInstance) {
  app.post('/rooms/:roomId/reservations', makeCreateReservationController())
  app.get('/reservations/users/:userId', makeFetchUserReservationsController())
  app.post(
    '/reservations/:reservationId/cancel',
    makeCancelReservationController(),
  )
}
