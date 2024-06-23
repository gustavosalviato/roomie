import { UseCaseError } from '@/core/errors/use-case-error'

export class UserAlreadyExists extends Error implements UseCaseError {
  constructor() {
    super('User already exists')
  }
}
