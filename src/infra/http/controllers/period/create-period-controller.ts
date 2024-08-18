import { CreatePeriodUseCase } from '@/domain/schedule/application/use-cases/create-period'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Controller } from '@/infra/http/protocols/controller'

import { ClientError } from '@/infra/http/controllers/errors/client-error'

import { FastifyReply, FastifyRequest } from 'fastify'

import z from 'zod'

const bodySchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
})

const paramsSchema = z.object({
  roomId: z.string(),
})

export class CreatePeriodController implements Controller {
  constructor(private createPeriodUseCase: CreatePeriodUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { startDate, endDate } = bodySchema.parse(request.body)

    const { roomId } = paramsSchema.parse(request.params)

    const result = await this.createPeriodUseCase.execute({
      roomId,
      startDate,
      endDate,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new ClientError(error.message)
        default:
          break
      }
    }

    return reply.status(201).send()
  }
}
