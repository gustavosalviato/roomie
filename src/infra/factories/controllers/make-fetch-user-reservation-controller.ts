import { makeFetchUserReservationsUseCase } from '../use-cases/make-fetch-user-reservations-use-case'
import { FetchUserReservationsController } from '@/infra/http/controllers/reservations/fetch-user-reservations-controller'

export function makeFetchUserReservationsController() {
  const fetchUserReservationsController = makeFetchUserReservationsUseCase()

  const cancelReservationController = new FetchUserReservationsController(
    fetchUserReservationsController,
  )

  return cancelReservationController.handle.bind(cancelReservationController)
}
