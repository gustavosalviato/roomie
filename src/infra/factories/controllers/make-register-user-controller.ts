import { RegisterUserController } from '@/infra/http/controllers/users/register-user-controller'
import { makeRegisterUserUseCase } from '../use-cases/make-register-user-use-case'

export function makeRegisterUserController() {
  const registerUserUseCase = makeRegisterUserUseCase()

  const registerUserController = new RegisterUserController(registerUserUseCase)

  return registerUserController.handle.bind(registerUserController)
}
