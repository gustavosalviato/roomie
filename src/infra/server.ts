import { env } from './env'
import { app } from './app'
import { userRoutes } from './http/controllers/users'

app.register(userRoutes)

app
  .listen({
    port: env.PORT,
    host: '0.0.0.0',
  })
  .then(() => console.log(`http server listening on port ${env.PORT}`))
