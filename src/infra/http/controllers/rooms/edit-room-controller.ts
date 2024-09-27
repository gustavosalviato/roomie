import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { EditRoomUseCase } from '@/domain/schedule/application/use-cases/edit-room'
import { Controller } from '@/infra/http/protocols/controller'
import { ClientError } from '@/infra/http/controllers/errors/client-error'

import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

const bodySchema = z.object({
  name: z.string(),
  location: z.string(),
  capacity: z.number().positive(),
  resources: z.array(z.string()),
})

const paramsSchema = z.object({
  roomId: z.string(),
})

export class EditRoomController implements Controller {
  constructor(private editRoomUseCase: EditRoomUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { roomId } = paramsSchema.parse(request.params)

    console.log(roomId)

    const { capacity, location, name, resources } = bodySchema.parse(
      request.body,
    )

    const result = await this.editRoomUseCase.execute({
      roomId,
      capacity,
      location,
      name,
      resources,
    })

    if (result.isRight()) {
      return reply.status(204).send()
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
