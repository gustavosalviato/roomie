import { PeriodsRepository } from '@/domain/schedule/application/repositories/periods-repository'
import { Period } from '@/domain/schedule/enterprise/entities/period'

export class InMemoryPeriodsRepository implements PeriodsRepository {
  public items: Period[] = []

  async create(period: Period) {
    this.items.push(period)
  }

  async findById(id: string) {
    const period = this.items.find(period => period.id.toString() === id)

    if (!period) {
      return null
    }

    return period
  }
}
