import { fastify } from 'fastify'

import { userRoutes } from './http/controllers/users'
import { roomRoutes } from './http/controllers/rooms'

import { errorHandler } from './error-handler'

export const app = fastify()

app.register(userRoutes)
app.register(roomRoutes)

app.setErrorHandler(errorHandler)
