import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { RegisterUserUseCase } from './register-user'
import { UserAlreadyExists } from '@/core/errors/errors/user-already-exists'
import { makeUser } from 'test/factories/make-user'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: RegisterUserUseCase

describe('Register User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()

    sut = new RegisterUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to register a user', async () => {
    const user = makeUser()

    const result = await sut.execute({
      name: user.name,
      email: user.email,
      password: user.passwordHash,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUsersRepository.items).toHaveLength(1)
  })

  it('should not be able to register a user with the same email', async () => {
    const email = 'johndoe@email.com'

    const firstUser = makeUser({
      email,
    })

    const secondUser = makeUser({
      email,
    })

    await sut.execute({
      name: firstUser.name,
      email,
      password: firstUser.passwordHash,
    })

    const result = await sut.execute({
      name: secondUser.name,
      email,
      password: secondUser.passwordHash,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserAlreadyExists)
  })
})
