import { FastifyReply, FastifyRequest } from 'fastify'

import { UserAlreadyExistsError } from '@/domain/schedule/application/use-cases/errors/user-already-exists-error'
import { RegisterUserUseCase } from '@/domain/schedule/application/use-cases/register-user'
import { Controller } from '@/infra/http/protocols/controller'

import { ClientError } from '../errors/client-error'

import z from 'zod'

const bodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

export class RegisterUserController implements Controller {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = bodySchema.parse(request.body)

    const result = await this.registerUserUseCase.execute({
      name,
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new ClientError(error.message)
        default:
          break
      }
    }

    return reply.status(201).send()
  }
}
