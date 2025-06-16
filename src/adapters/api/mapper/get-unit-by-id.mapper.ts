import { Unit } from '../../../core/domain/model/Genre';
import { ProfileRequest } from '../request/profile.request';
import { GetUnitByIdCommand } from '../../../core/usecases/get-units-by-id.use-case';
import { GetUnitByIdResponse } from '../response/get-unit-by-id.response';

export class GetUnitByIdMapper {
  static toDomain(
    currentUser: ProfileRequest,
    unitId: string,
  ): GetUnitByIdCommand {
    return {
      currentUser: {
        id: currentUser.id,
        type: currentUser.type,
      },
      unitId: unitId,
    };
  }

  static fromDomain(unit: Unit): GetUnitByIdResponse {
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
