import { makeCancelReservationUseCase } from '../use-cases/make-cancel-reservation-use-case'
import { CancelReservationController } from '@/infra/http/controllers/reservations/cancel-reservation-controller'

export function makeCancelReservationController() {
  const cancelReservationUseCase = makeCancelReservationUseCase()

  const cancelReservationController = new CancelReservationController(
    cancelReservationUseCase,
  )

  return cancelReservationController.handle.bind(cancelReservationController)
}
