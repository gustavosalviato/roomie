import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface ReservationProps {
  userId: UniqueEntityID
  roomId: UniqueEntityID
  periodId: UniqueEntityID
  createdAt: Date
  startDate: Date
  endDate: Date
  canceledAt?: Date
}

export class Reservation extends Entity<ReservationProps> {
  get userId() {
    return this.props.userId
  }

  get roomId() {
    return this.props.roomId
  }

  get periodId() {
    return this.props.periodId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get startDate() {
    return this.props.startDate
  }

  get endDate() {
    return this.props.endDate
  }

  set startDate(startDate: Date) {
    this.props.startDate = startDate
  }

  set endDate(endDate: Date) {
    this.props.endDate = endDate
  }

  set canceledAt(canceledAt: Date | undefined) {
    this.props.canceledAt = canceledAt
  }

  static create(
    props: Optional<ReservationProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const reservation = new Reservation(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return reservation
  }
}
