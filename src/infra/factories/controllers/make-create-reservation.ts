import { makeCreateReservationUseCase } from '../use-cases/make-create-reservation'
import { CreateReservationController } from '@/infra/http/controllers/reservations/create-reservation-controller'

export function makeCreateReservationController() {
  const createReservation = makeCreateReservationUseCase()

  const createPeriodController = new CreateReservationController(
    createReservation,
  )

  return createPeriodController.handle.bind(createPeriodController)
}
