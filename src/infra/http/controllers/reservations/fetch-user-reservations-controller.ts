import { FetchUserReservationsUseCase } from '@/domain/schedule/application/use-cases/fetch-user-resevations'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Controller } from '@/infra/http/protocols/controller'

import { ClientError } from '@/infra/http/controllers/errors/client-error'

import { FastifyReply, FastifyRequest } from 'fastify'

import z from 'zod'
import { ReservationPresenter } from '../../presenters/reservations-presenter'

const paramsSchema = z.object({
  userId: z.string(),
})

export class FetchUserReservationsController implements Controller {
  constructor(private fetchUserReservations: FetchUserReservationsUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { userId } = paramsSchema.parse(request.params)

    const result = await this.fetchUserReservations.execute({
      userId,
    })

    if (result.isRight()) {
      const reservations = result.value.reservations.map(reservation =>
        ReservationPresenter.toHTTP(reservation),
      )

      return reply.status(200).send(reservations)
    } else {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new ClientError(error.message)
        default:
          break
      }
    }
  }
}
