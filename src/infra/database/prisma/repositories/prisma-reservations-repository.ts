import { ReservationsRepository } from '@/domain/schedule/application/repositories/reservations-repository'
import { Reservation } from '@/domain/schedule/enterprise/entities/reservation'

import { PrismaReservationMapper } from '../mappers/prisma-reservation-mapper'
import { PrismaClient } from '@prisma/client'

export class PrismaReservationsRepository implements ReservationsRepository {
  constructor(private prisma: PrismaClient) {}

  async create(reservation: Reservation): Promise<void> {
    const data = PrismaReservationMapper.toPrisma(reservation)

    await this.prisma.reservation.create({
      data,
    })
  }

  async save(reservation: Reservation): Promise<void> {
    const data = PrismaReservationMapper.toPrisma(reservation)

    await this.prisma.reservation.update({
      where: {
        id: data.room_id,
      },
      data,
    })
  }

  async findManyByUser(userId: string): Promise<Reservation[]> {
    const reservations = await this.prisma.reservation.findMany({
      where: {
        user_id: userId,
      },
    })

    return reservations.map(reservation =>
      PrismaReservationMapper.toDomain(reservation),
    )
  }

  async findById(id: string): Promise<Reservation | null> {
    const reservation = await this.prisma.reservation.findUnique({
      where: {
        id,
      },
    })

    if (!reservation) {
      return null
    }

    return PrismaReservationMapper.toDomain(reservation)
  }

  async findByRoomAndTime(
    roomId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Reservation[]> {
    const reservations = await this.prisma.reservation.findMany({
      where: {
        room_id: roomId,
        start_date: {
          lte: endDate,
        },
        end_date: {
          gte: startDate,
        },
      },
    })

    return reservations.map(reservation =>
      PrismaReservationMapper.toDomain(reservation),
    )
  }
}
