import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { RegisterUserUseCase } from './register-user'
import { makeUser } from 'test/factories/make-user'
import { FakeHasher } from 'test/cryptography/fake-hasher'

import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher
let sut: RegisterUserUseCase

describe('Register User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()

    sut = new RegisterUserUseCase(inMemoryUsersRepository, fakeHasher)
  })

  it('should be able to register a user', async () => {
    const user = makeUser()

    const result = await sut.execute({
      name: user.name,
      email: user.email,
      password: user.password,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUsersRepository.items).toHaveLength(1)
    expect(
      inMemoryUsersRepository.items[0].password.endsWith('-hashed'),
    ).toBeTruthy()
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
      password: firstUser.password,
    })

    const result = await sut.execute({
      name: secondUser.name,
      email,
      password: secondUser.password,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserAlreadyExistsError)
  })
})
