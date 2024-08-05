import { UseCaseError } from '@/core/errors/use-case-error'

export class InvalidReservationEndDateError
  extends Error
  implements UseCaseError
{
  constructor() {
    super('Invalid reservation end date.')
  }
}
