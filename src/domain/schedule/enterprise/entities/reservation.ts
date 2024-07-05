import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface ReservationProps {
  userId: UniqueEntityID
  roomId: UniqueEntityID
  createdAt: Date
  canceledAt?: Date
}

export class Reservation extends Entity<ReservationProps> {
  get userId() {
    return this.props.userId
  }

  get roomId() {
    return this.props.roomId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get canceledAt() {
    return this.props.canceledAt
  }

  static create(
    props: Optional<Reservation, 'createdAt'>,
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
