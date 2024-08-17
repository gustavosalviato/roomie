import { makeDeleteRoomUseCase } from '../use-cases/make-delete-room-use-case'
import { DeleteRoomController } from '@/infra/http/controllers/rooms/delete-room-controller'

export function makeDeleteRoomController() {
  const deleteRoomUseCase = makeDeleteRoomUseCase()

  const deleteRoomController = new DeleteRoomController(deleteRoomUseCase)

  return deleteRoomController.handle.bind(deleteRoomController)
}
