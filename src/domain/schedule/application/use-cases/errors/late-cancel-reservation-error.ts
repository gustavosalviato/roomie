import { UseCaseError } from '@/core/errors/use-case-error'

export class LateCancelReservationError extends Error implements UseCaseError {
  constructor() {
    super(
      'Cancellation must be made up to one hour in advance of the start time',
    )
  }
}
