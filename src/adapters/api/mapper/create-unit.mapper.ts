import { CreateUnitCommand } from '../../../core/usecases/create-unit';
import { CreateUnitRequest } from '../request/create-unit.request';
import { Unit } from '../../../core/domain/model/Genre';
import { CreateUnitResponse } from '../response/create-unit.response';
import { ProfileRequest } from '../request/profile.request';

export class CreateUnitMapper {
  static toDomain(
    currentUser: ProfileRequest,
    request: CreateUnitRequest,
  ): CreateUnitCommand {
    return {
      currentUser: {
        id: currentUser.id,
        type: currentUser.type,
      },
      title: request.title,
      description: request.description,
      chapterId: request.chapterId,
    };
  }

  static fromDomain(unit: Unit): CreateUnitResponse {
    return {
      id: unit.id,
      title: unit.title,
      description: unit.description,
      chapterId: unit.chapterId,
      isPublished: unit.isPublished,
      createdAt: unit.createdAt,
      updatedAt: unit.updatedAt,
    };
  }
}
