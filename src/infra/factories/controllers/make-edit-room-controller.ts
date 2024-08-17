import { makeEditRoomUseCase } from '../use-cases/make-edit-room-use-case'
import { EditRoomController } from '@/infra/http/controllers/rooms/edit-room-controller'

export function makeEditRoomController() {
  const editRoomUseCase = makeEditRoomUseCase()

  const editRoomController = new EditRoomController(editRoomUseCase)

  return editRoomController.handle.bind(editRoomController)
}
