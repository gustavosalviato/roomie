import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { AuthenticateUser } from './authenticate-user'
import { makeUser } from 'test/factories/make-user'
import { FakeHasher } from 'test/cryptography/fake-hasher'

import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher
let sut: AuthenticateUser

describe('Authenticate User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()

    sut = new AuthenticateUser(inMemoryUsersRepository, fakeHasher)
  })

  it('should be able to authenticate user', async () => {
    const user = makeUser({
      password: '123456-hashed',
    })

    inMemoryUsersRepository.create(user)

    const result = await sut.execute({
      email: user.email,
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUsersRepository.items[0].id.toString()).toEqual(
      expect.any(String),
    )
  })

  it('should not be able to autheticate user with wrong email', async () => {
    const user = makeUser()

    const result = await sut.execute({
      email: user.email,
      password: user.password,
    })

    expect(result.isLeft).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to autheticate user with wrong password', async () => {
    const user = makeUser({
      password: '123456',
    })

    inMemoryUsersRepository.create(user)

    const result = await sut.execute({
      email: user.email,
      password: 'user-wrong-password',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(InvalidCredentialsError)
  })
})
