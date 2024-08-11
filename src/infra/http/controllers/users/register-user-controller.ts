import { FastifyReply, FastifyRequest } from 'fastify'

import { UserAlreadyExistsError } from '@/domain/schedule/application/use-cases/errors/user-already-exists-error'

import { makeRegisterUserUseCase } from '@/infra/http/factories/make-register-user-use-case'
import { Controller } from '@/infra/http/protocols/controller'

import z from 'zod'

const bodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

export class RegisterUserController implements Controller {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = bodySchema.parse(request.body)

    const registerUser = makeRegisterUserUseCase()

    const result = await registerUser.execute({
      name,
      email,
      password,
    })

    if (result.isLeft()) {
      throw new UserAlreadyExistsError()
    }

    return reply.status(201).send()
  }
}
