import { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'
import { ClientError } from './http/controllers/errors/client-error'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Invalid input.',
      errors: error.flatten().fieldErrors,
    })
  }

  if (error instanceof ClientError) {
    return reply.status(400).send({
      message: error.message,
    })
  }

  return reply.status(500).send({
    message: 'Internal server error',
  })
}
