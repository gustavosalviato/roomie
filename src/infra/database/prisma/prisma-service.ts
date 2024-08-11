import { PrismaClient } from '@prisma/client'

export class PrismaService extends PrismaClient {
  constructor() {
    super({
      log: ['query', 'warn'],
    })
  }

  onConnect() {
    return this.$connect()
  }

  onDisconnect() {
    return this.$disconnect()
  }
}
