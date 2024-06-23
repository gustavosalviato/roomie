import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { RegisterUserUseCase } from './register-user'
import { UserAlreadyExists } from '@/core/errors/errors/user-already-exists'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: RegisterUserUseCase

describe('Register User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()

    sut = new RegisterUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to register a user', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
      createdAt: new Date(),
    })

    expect(inMemoryUsersRepository.items).toHaveLength(1)
  })

  it('should not be able to register a user with the same email', async () => {
    const email = 'johndoe@email.com'

    await sut.execute({
      name: 'John Doe 1',
      email,
      password: '123456',
      createdAt: new Date(),
    })

    await expect(
      sut.execute({
        name: 'John Doe 2',
        email,
        password: '123456',
        createdAt: new Date(),
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExists)
  })
})
