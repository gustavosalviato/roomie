import { CreateRoomController } from '@/infra/http/controllers/rooms/create-room-controller'
import { makeCreateRoomUseCase } from '../use-cases/make-create-room-use-case'

export function makeCreateRoomController() {
  const createRoomUseCase = makeCreateRoomUseCase()

  const createRoomController = new CreateRoomController(createRoomUseCase)

  return createRoomController.handle.bind(createRoomController)
}
