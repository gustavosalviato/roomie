import { RegisterUserUseCase } from '@/domain/schedule/application/use-cases/register-user'

import { BcryptHasher } from '@/infra/cryptography/bcrypt-hasher'
import { PrismaService } from '@/infra/database/prisma/prisma-service'
import { PrismaUserRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'

export function makeRegisterUserUseCase() {
  const prismaService = new PrismaService()
  const usersRepository = new PrismaUserRepository(prismaService)

  const bcryptHasher = new BcryptHasher()

  const registerUserUseCase = new RegisterUserUseCase(
    usersRepository,
    bcryptHasher,
  )

  return registerUserUseCase
}
