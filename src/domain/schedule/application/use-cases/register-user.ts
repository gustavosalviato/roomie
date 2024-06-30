import { Either, left, right } from '@/core/either'
import { UserAlreadyExists } from '@/core/errors/errors/user-already-exists'
import { UsersRepository } from '@/domain/schedule/application/repositories/users-repository'
import { User } from '@/domain/schedule/enterprise/entities/user'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
}

type RegisterUserUseCaseResponse = Either<
  UserAlreadyExists,
  {
    user: User
  }
>

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      return left(new UserAlreadyExists())
    }

    const user = User.create({
      name,
      email,
      passwordHash: password,
    })

    await this.usersRepository.create(user)

    return right({
      user,
    })
  }
}
