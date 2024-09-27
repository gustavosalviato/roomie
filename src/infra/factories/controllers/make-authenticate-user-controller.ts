import { makeAuthenticateUserUseCase } from '../use-cases/make-authenticate-user-use-case'
import { AuthenticateUserController } from '@/infra/http/controllers/users/authenticate-user-controller'

export function makeAuthenticateUserController() {
  const authenticateUserUseCase = makeAuthenticateUserUseCase()

  const authenticateUserController = new AuthenticateUserController(
    authenticateUserUseCase,
  )

  return authenticateUserController.handle.bind(authenticateUserController)
}
