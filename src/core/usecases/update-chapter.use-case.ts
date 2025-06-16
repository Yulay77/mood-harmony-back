import { UseCase } from '../base/use-case';
import { Chapter } from '../domain/model/Track';
import { ChapterRepository } from '../domain/repository/userEmotion.repository';
import { User } from '../domain/model/User';
import { UserType } from '../domain/type/UserType';
import { UserNotAllowedError } from '../domain/error/UserNotAllowedError';
import { ChapterNotFoundError } from '../domain/error/ChapterNotFoundError';

export type UpdateChapterCommand = {
  currentUser: Pick<User, 'id' | 'type'>;
  chapterId: string;
  title?: string;
  description?: string;
  isPublished?: boolean;
};

export class UpdateChapterUseCase
  implements UseCase<UpdateChapterCommand, Chapter>
{
  constructor(private readonly chapterRepository: ChapterRepository) {}

  async execute(command: UpdateChapterCommand): Promise<Chapter> {
    if (!this.canExecute(command.currentUser)) {
      throw new UserNotAllowedError(
        'Unauthorized: Only admins can update chapters',
      );
    }

    const { chapterId, title, description } = command;

    const currentChapter = await this.chapterRepository.findById(chapterId);
    if (!currentChapter) {
      throw new ChapterNotFoundError(chapterId);
    }

    const chapter = new Chapter(
      currentChapter.id,
      title ?? currentChapter.title,
      description ?? currentChapter.description,
      command.isPublished ?? currentChapter.isPublished,
    );

    const updatedChapter = await this.chapterRepository.update(
      chapterId,
      chapter,
    );
    if (!updatedChapter) {
      throw new ChapterNotFoundError(chapterId);
    }
    return updatedChapter;
  }

  private canExecute(currentUser: Pick<User, 'id' | 'type'>): boolean {
    return currentUser.type === UserType.ADMIN;
  }
}
