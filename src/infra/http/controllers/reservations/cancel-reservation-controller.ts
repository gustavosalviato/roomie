import { CancelReservationUseCase } from '@/domain/schedule/application/use-cases/cancel-reservation'
import { Controller } from '@/infra/http/protocols/controller'

import { ClientError } from '@/infra/http/controllers/errors/client-error'
import { LateCancelReservationError } from '@/domain/schedule/application/use-cases/errors/late-cancel-reservation-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { FastifyReply, FastifyRequest } from 'fastify'

import z from 'zod'
const paramsSchema = z.object({
  reservationId: z.string(),
})

export class CancelReservationController implements Controller {
  constructor(private cancelReservation: CancelReservationUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { reservationId } = paramsSchema.parse(request.params)

    const result = await this.cancelReservation.execute({
      reservationId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new ClientError(error.message)
        case LateCancelReservationError:
          throw new ClientError(error.message)
        default:
          break
      }
    }

    return reply.status(200).send()
  }
}
