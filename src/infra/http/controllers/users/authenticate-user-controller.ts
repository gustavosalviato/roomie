import { FastifyReply, FastifyRequest } from 'fastify'

import { AuthenticateUserUseCase } from '@/domain/schedule/application/use-cases/authenticate-user'
import { Controller } from '@/infra/http/protocols/controller'

import { ClientError } from '../errors/client-error'

import z from 'zod'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { InvalidCredentialsError } from '@/domain/schedule/application/use-cases/errors/invalid-credentials-error'

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export class AuthenticateUserController implements Controller {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = bodySchema.parse(request.body)

    const result = await this.authenticateUserUseCase.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new ClientError(error.message)
        case InvalidCredentialsError:
          throw new ClientError(error.message)
        default:
          break
      }
    }

    return reply.status(200).send()
  }
}
