import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface RoomProps {
  name: string
  location: string
  capacity: number
  resources: string[]
  createdAt: Date
  updatedAt?: Date
}

export class Room extends Entity<RoomProps> {
  get name() {
    return this.props.name
  }

  get location() {
    return this.props.location
  }

  get capacity() {
    return this.props.capacity
  }

  get resources() {
    return this.props.resources
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  set name(name: string) {
    this.props.name = name

    this.touch()
  }

  set location(location: string) {
    this.props.location = location

    this.touch()
  }

  set capacity(capacity: number) {
    this.props.capacity = capacity

    this.touch()
  }

  set resources(resources: string[]) {
    this.props.resources = resources

    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<RoomProps, 'createdAt'>, id?: UniqueEntityID) {
    const room = new Room(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return room
  }
}
