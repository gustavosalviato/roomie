import { InMemoryReservationsRepository } from 'test/repositories/in-memory-reservations-repository'
import { makeReservation } from 'test/factories/make-reservation'
import { LateCancelReservationError } from './errors/late-cancel-reservation-error'

import { CancelReservationUseCase } from './cancel-reservation'

describe('Cancel Reservation', () => {
  let inMemoryReservationsRepository: InMemoryReservationsRepository
  let sut: CancelReservationUseCase

  beforeEach(() => {
    inMemoryReservationsRepository = new InMemoryReservationsRepository()
    sut = new CancelReservationUseCase(inMemoryReservationsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to cancel a reservation up to one hour before the start time', async () => {
    const reservation = makeReservation({
      startDate: new Date(),
    })

    await inMemoryReservationsRepository.create(reservation)

    const result = await sut.execute({
      reservationId: reservation.id.toString(),
    })

    expect(result.isRight()).toBe(true)
  })

  it('should not be able to cancel a reservation up to one hour after start time', async () => {
    vi.setSystemTime(new Date(2024, 6, 20, 6))

    const reservation = makeReservation({
      startDate: new Date(2024, 6, 20, 6),
      endDate: new Date(2024, 6, 20, 8),
    })

    await inMemoryReservationsRepository.create(reservation)

    const OneHourAndOneMinuteInMs = 1000 * 60 * 61

    vi.advanceTimersByTime(OneHourAndOneMinuteInMs)

    const result = await sut.execute({
      reservationId: reservation.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(LateCancelReservationError)
  })
})
