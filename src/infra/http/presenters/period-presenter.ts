import { Period } from '@/domain/schedule/enterprise/entities/period'

export class PeriodPresenter {
  static toHTTP(period: Period) {
    return {
      id: period.id.toString(),
      roomId: period.roomId.toString(),
      startDate: period.startDate,
      endDate: period.endDate,
    }
  }
}
