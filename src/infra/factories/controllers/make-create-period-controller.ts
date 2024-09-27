import { makeCreatePeriodUseCase } from '../use-cases/make-create-period-use-case'
import { CreatePeriodController } from '@/infra/http/controllers/periods/create-period-controller'

export function makeCreatePeriodController() {
  const createPeriodUseCase = makeCreatePeriodUseCase()

  const createPeriodController = new CreatePeriodController(createPeriodUseCase)

  return createPeriodController.handle.bind(createPeriodController)
}
