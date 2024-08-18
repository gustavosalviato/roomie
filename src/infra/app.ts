import { fastify } from 'fastify'

import { userRoutes } from './http/controllers/users'
import { roomRoutes } from './http/controllers/rooms'
import { periodRoutes } from './http/controllers/periods'
import { reservationRoutes } from './http/controllers/reservations'

import { errorHandler } from './error-handler'

export const app = fastify()

app.register(userRoutes)
app.register(roomRoutes)
app.register(periodRoutes)
app.register(reservationRoutes)

app.setErrorHandler(errorHandler)
