import { UseCaseError } from '@/core/errors/use-case-error'

export class RecordAlreadyExistsError extends Error implements UseCaseError {
  constructor(name: string) {
    super(`${name} already exists.`)
  }
}
