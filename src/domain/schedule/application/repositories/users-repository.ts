import { User } from '@/domain/schedule/enterprise/entities/user'

export interface UsersRepository {
  create(user: User): Promise<void>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
}
