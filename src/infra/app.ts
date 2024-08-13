import { fastify } from 'fastify'

import { userRoutes } from './http/controllers/users'
import { errorHandler } from './error-handler'

export const app = fastify()

app.register(userRoutes)

app.setErrorHandler(errorHandler)
