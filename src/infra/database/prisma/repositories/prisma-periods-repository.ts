import { PeriodsRepository } from '@/domain/schedule/application/repositories/periods-repository'
import { Period } from '@/domain/schedule/enterprise/entities/period'

import { PrismaClient } from '@prisma/client'
import { PrismaPeriodMapper } from '../mappers/prisma-period-mapper'

export class PrismaPeriodsRepository implements PeriodsRepository {
  constructor(private prisma: PrismaClient) {}
  async create(period: Period): Promise<void> {
    const data = PrismaPeriodMapper.toPrisma(period)

    await this.prisma.period.create({
      data,
    })
  }

  async findById(id: string): Promise<Period | null> {
    const period = await this.prisma.period.findUnique({
      where: {
        id,
      },
    })

    if (!period) {
      return null
    }

    return PrismaPeriodMapper.toDomain(period)
  }
}
