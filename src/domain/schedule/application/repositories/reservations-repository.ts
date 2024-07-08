import { Reservation } from '@/domain/schedule/enterprise/entities/reservation'

export interface Params {
  startDate: Date
  endDate: Date
  roomId: String
}

export interface ReservationsRepository {
  create(reservation: Reservation): Promise<void>
  save(reservation: Reservation): Promise<void>
  findManyByUser(userId: string): Promise<Reservation[]>
  findById(id: string): Promise<Reservation | null>
  findUniqueReservation(params: Params): Promise<Reservation | null>
}
