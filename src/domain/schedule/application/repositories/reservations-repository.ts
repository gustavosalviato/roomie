import { Reservation } from '@/domain/schedule/enterprise/entities/reservation'

export interface Params {
  startDate: Date
  endDate: Date
  roomId: String
}

export interface ReservationsRepository {
  create(reservation: Reservation): Promise<void>
  findUniqueReservation(params: Params): Promise<Reservation | null>
}
