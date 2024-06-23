import { UserAlreadyExists } from '@/core/errors/errors/user-already-exists'
import { UsersRepository } from '@/domain/schedule/application/repositories/users-repository'
import { User } from '@/domain/schedule/enterprise/entities/user'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
  createdAt: Date
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    createdAt,
  }: RegisterUserUseCaseRequest) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExists()
    }

    const user = User.create({
      name,
      email,
      createdAt,
      passwordHash: password,
    })

    await this.usersRepository.create(user)
  }
}
