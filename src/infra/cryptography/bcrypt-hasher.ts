import { hash, compare } from 'bcrypt'

import { HashCompare } from '@/domain/schedule/application/cryptography/hash-compare'
import { HashGenerator } from '@/domain/schedule/application/cryptography/hash-generator'

export class BcryptHasher implements HashGenerator, HashCompare {
  private HASH_SALT_LENGTH = 6

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH)
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }
}
