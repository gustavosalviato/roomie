import { UseCaseError } from '@/core/errors/use-case-error'

export class ReservationInvalidDurationError
  extends Error
  implements UseCaseError
{
  constructor() {
    super('Reservation invalid duration.')
  }
}
