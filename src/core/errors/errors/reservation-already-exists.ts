import { UseCaseError } from '@/core/errors/use-case-error'

export class ReservationAlreadyExits extends Error implements UseCaseError {
  constructor() {
    super('Reservation already exists')
  }
}
