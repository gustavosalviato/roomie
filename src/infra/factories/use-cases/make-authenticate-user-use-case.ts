import { AuthenticateUserUseCase } from '@/domain/schedule/application/use-cases/authenticate-user'

import { BcryptHasher } from '@/infra/cryptography/bcrypt-hasher'
import { PrismaService } from '@/infra/database/prisma/prisma-service'
import { PrismaUserRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'

export function makeAuthenticateUserUseCase() {
  const prismaService = new PrismaService()
  const usersRepository = new PrismaUserRepository(prismaService)

  const bcryptHasher = new BcryptHasher()

  const registerUserUseCase = new AuthenticateUserUseCase(
    usersRepository,
    bcryptHasher,
  )

  return registerUserUseCase
}
