import { Either, left, right } from '@/core/either'

import { User } from '@/domain/schedule/enterprise/entities/user'
import { UsersRepository } from '@/domain/schedule/application/repositories/users-repository'

import { HashCompare } from '../cryptography/hash-compare'

import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUserUseCaseResponse = Either<
  ResourceNotFoundError | InvalidCredentialsError,
  {
    user: User
  }
>

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashCompare: HashCompare,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const doesPasswordMatches = await this.hashCompare.compare(
      password,
      user.password,
    )

    if (!doesPasswordMatches) {
      return left(new InvalidCredentialsError())
    }

    return right({
      user,
    })
  }
}
