import { Either, left, right } from '@/core/either'
import { UserAlreadyExists } from '@/core/errors/errors/user-already-exists'
import { UsersRepository } from '@/domain/schedule/application/repositories/users-repository'
import { User } from '@/domain/schedule/enterprise/entities/user'
import { HashGenerator } from '../cryptography/hash-generator'

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
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      return left(new UserAlreadyExists())
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = User.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.usersRepository.create(user)

    return right({
      user,
    })
  }
}
