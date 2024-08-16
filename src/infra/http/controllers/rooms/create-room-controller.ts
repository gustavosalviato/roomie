import { CreateRoomUseCase } from '@/domain/schedule/application/use-cases/create-room'
import { Controller } from '@/infra/http/protocols/controller'
import { RecordAlreadyExistsError } from '@/domain/schedule/application/use-cases/errors/room-already-exists'
import { RoomPresenter } from '../../presenters/room-presenter'

import { ClientError } from '../errors/client-error'

import { FastifyReply, FastifyRequest } from 'fastify'

import z from 'zod'

const bodySchema = z.object({
  name: z.string(),
  location: z.string(),
  capacity: z.number().positive(),
  resources: z.array(z.string()),
})

export class CreateRoomController implements Controller {
  constructor(private createRoomUseCase: CreateRoomUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { capacity, location, name, resources } = bodySchema.parse(
      request.body,
    )

    const result = await this.createRoomUseCase.execute({
      name,
      capacity,
      location,
      resources,
    })

    if (result.isRight()) {
      return reply.status(200).send(RoomPresenter.toHTTP(result.value.room))
    } else {
      const error = result.value

      switch (error.constructor) {
        case RecordAlreadyExistsError:
          throw new ClientError(error.message)
        default:
          break
      }
    }
  }
}
