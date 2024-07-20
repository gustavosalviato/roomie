import { UseCaseError } from '@/core/errors/use-case-error'

export class ReservationInvalidDuration extends Error implements UseCaseError {
  constructor() {
    super('Reservation invalid duration')
  }
}
