import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface PeriodProps {
  roomId: UniqueEntityID
  startDate: Date
  endDate: Date
}

export class Period extends Entity<PeriodProps> {
  get roomId() {
    return this.props.roomId
  }

  get startDate() {
    return this.props.startDate
  }

  get endDate() {
    return this.props.endDate
  }

  static create(props: PeriodProps, id?: UniqueEntityID) {
    const period = new Period(props, id)

    return period
  }
}
