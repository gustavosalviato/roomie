import { CreateReservationUseCase } from '@/domain/schedule/application/use-cases/create-reservation'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Controller } from '@/infra/http/protocols/controller'

import { ClientError } from '@/infra/http/controllers/errors/client-error'
import { ReservationAlreadyExistsError } from '@/domain/schedule/application/use-cases/errors/reservation-already-exists-error'
import { InvalidReservationEndDateError } from '@/domain/schedule/application/use-cases/errors/invalid-reservation-end-date-error'
import { ReservationInvalidDurationError } from '@/domain/schedule/application/use-cases/errors/reservation-invalid-duration-error'
import { ReservationPresenter } from '../../presenters/reservations-presenter'

import { FastifyReply, FastifyRequest } from 'fastify'

import z from 'zod'

const bodySchema = z.object({
  userId: z.string(),
  periodId: z.string(),
})

const paramsSchema = z.object({
  roomId: z.string(),
})

export class CreateReservationController implements Controller {
  constructor(private createReservation: CreateReservationUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { userId, periodId } = bodySchema.parse(request.body)

    const { roomId } = paramsSchema.parse(request.params)

    const result = await this.createReservation.execute({
      userId,
      periodId,
      roomId,
    })

    if (result.isRight()) {
      const reservationId = ReservationPresenter.toHTTP(
        result.value.reservation,
      ).id

      return reply.status(201).send({
        reservationId,
      })
    } else {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new ClientError(error.message)
        case ReservationAlreadyExistsError:
          throw new ClientError(error.message)
        case InvalidReservationEndDateError:
          throw new ClientError(error.message)
        case ReservationInvalidDurationError:
          throw new ClientError(error.message)
        default:
          break
      }
    }

    return reply.status(201).send()
  }
}
