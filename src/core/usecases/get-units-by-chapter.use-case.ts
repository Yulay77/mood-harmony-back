import { UseCase } from '../base/use-case';
import { Unit } from '../domain/model/Genre';
import { UnitRepository } from '../domain/repository/unit.repository';
import { User } from '../domain/model/User';
import { UserType } from '../domain/type/UserType';
import { UserNotAllowedError } from '../domain/error/UserNotAllowedError';

export type getUnitsByChapterIdCommand = {
  currentUser: Pick<User, 'id' | 'type'>;
  chapterId: string;
};

export class getUnitsByChapterIdUseCase
  implements UseCase<getUnitsByChapterIdCommand, Unit[]>
{
  constructor(private readonly unitRepository: UnitRepository) {}

  async execute(command: getUnitsByChapterIdCommand): Promise<Unit[]> {
    if (!this.canExecute(command.currentUser)) {
      throw new UserNotAllowedError('Unauthorized: Only admins can get units');
    }

    return this.unitRepository.findByChapter(command.chapterId);
  }

  private canExecute(currentUser: Pick<User, 'id' | 'type'>): boolean {
    return currentUser.type === UserType.ADMIN;
  }
}
