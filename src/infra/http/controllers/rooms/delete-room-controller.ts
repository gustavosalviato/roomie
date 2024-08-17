import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { DeleteRoomUseCase } from '@/domain/schedule/application/use-cases/delete-room'

import { Controller } from '@/infra/http/protocols/controller'
import { ClientError } from '@/infra/http/controllers/errors/client-error'

import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

const paramsSchema = z.object({
  roomId: z.string(),
})

export class DeleteRoomController implements Controller {
  constructor(private deleteRoomUseCase: DeleteRoomUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { roomId } = paramsSchema.parse(request.params)

    const result = await this.deleteRoomUseCase.execute({
      roomId,
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

    return reply.status(200).send()
  }
}
