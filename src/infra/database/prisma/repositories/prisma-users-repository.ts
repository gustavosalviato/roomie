import { UsersRepository } from '@/domain/schedule/application/repositories/users-repository'
import { User } from '@/domain/schedule/enterprise/entities/user'

import { PrismaClient } from '@prisma/client'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'

export class PrismaUserRepository implements UsersRepository {
  constructor(private prisma: PrismaClient) {}

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user)

    await this.prisma.user.create({
      data,
    })
  }
  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }
}
