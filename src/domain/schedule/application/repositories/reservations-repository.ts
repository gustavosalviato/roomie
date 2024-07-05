import { Reservation } from '@/domain/schedule/enterprise/entities/reservation'

export interface ReservationsRepository {
  create(reservation: Reservation): Promise<void>
}
