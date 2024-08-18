import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/schedule/enterprise/entities/user'
import { type User as PrismaUser, Prisma } from '@prisma/client'
export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        createdAt: raw.created_at,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      created_at: user.createdAt,
    }
  }
}
