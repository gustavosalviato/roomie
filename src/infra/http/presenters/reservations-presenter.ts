import { Reservation } from '@/domain/schedule/enterprise/entities/reservation'

export class ReservationPresenter {
  static toHTTP(reservation: Reservation) {
    return {
      id: reservation.id.toString(),
      userId: reservation.userId.toString(),
      roomId: reservation.roomId.toString(),
      periodId: reservation.periodId.toString(),
      createdAt: reservation.createdAt,
      startDate: reservation.startDate,
      endDate: reservation.endDate,
      canceledAt: reservation.canceledAt,
    }
  }
}
