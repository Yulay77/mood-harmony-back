import { UseCase } from '../base/use-case';
import { Chapter } from '../domain/model/Track';
import { ChapterRepository } from '../domain/repository/emotion.repository';
import { User } from '../domain/model/User';
import { UserType } from '../domain/type/UserType';
import { UserNotAllowedError } from '../domain/error/UserNotAllowedError';

export type CreateChapterCommand = {
  currentUser: Pick<User, 'id' | 'type'>;
  title: string;
  description: string;
};

export class CreateChapterUseCase
  implements UseCase<CreateChapterCommand, Chapter>
{
  constructor(private readonly chapterRepository: ChapterRepository) {}

  async execute(command: CreateChapterCommand): Promise<Chapter> {
    if (!this.canExecute(command.currentUser)) {
      throw new UserNotAllowedError(
        'Unauthorized: Only admins can create chapters',
      );
    }

    const { title, description } = command;
    const chapter = new Chapter(this.generateId(), title, description, false);

    return this.chapterRepository.create(chapter);
  }

  private canExecute(currentUser: Pick<User, 'id' | 'type'>): boolean {
    return currentUser.type === UserType.ADMIN;
  }

  private generateId(): string {
    return crypto.randomUUID();
  }
}
