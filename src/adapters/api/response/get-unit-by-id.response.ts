import { ApiProperty } from '@nestjs/swagger';

export class GetUnitByIdResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  chapterId: string;

  @ApiProperty()
  isPublished: boolean;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  createdAt: Date;

  constructor(
    id: number,
    title: string,
    description: string,
    chapterId: string,
    isPublished: boolean,
    updatedAt: Date,
    createdAt: Date,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.chapterId = chapterId;
    this.isPublished = isPublished;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
  }
}
