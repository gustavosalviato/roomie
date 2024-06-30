import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User, UserProps } from '@/domain/schedule/enterprise/entities/user'

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityID,
) {
  const user = User.create(
    {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      passwordHash: faker.internet.password(),
      ...override,
    },
    id,
  )

  return user
}
