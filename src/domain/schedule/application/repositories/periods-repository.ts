import { Period } from '@/domain/schedule/enterprise/entities/period'

export interface PeriodsRepository {
  create(period: Period): Promise<void>
  findById(id: string): Promise<Period | null>
}
