import { FastifyReply, FastifyRequest } from 'fastify'

import { UserAlreadyExistsError } from '@/domain/schedule/application/use-cases/errors/user-already-exists-error'
import { RegisterUserUseCase } from '@/domain/schedule/application/use-cases/register-user'
import { Controller } from '@/infra/http/protocols/controller'

import z from 'zod'

const bodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

export class RegisterUserController implements Controller {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, email, password } = bodySchema.parse(request.body)

      const result = await this.registerUserUseCase.execute({
        name,
        email,
        password,
      })

      if (result.isLeft()) {
        throw new UserAlreadyExistsError()
      }

      return reply.status(201).send()
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        return reply.status(400).send({
          message: error.message,
        })
      }

      console.log(error)
    }
  }
}
