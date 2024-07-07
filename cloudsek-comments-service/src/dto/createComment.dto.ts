import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDTO {
  @IsNotEmpty()
  @IsString()
  readonly postId: string;

  @IsNotEmpty()
  @IsString()
  readonly text: string;

  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @IsEmpty()
  readonly isDeleted: Date;

  @IsEmpty()
  readonly createdAt: Date;

  @IsEmpty()
  readonly updatedAt: Date;

  constructor(
    postId: any,
    text: any,
    author: any,
    isDeleted: any,
    createdAt: any,
    updatedAt: any
  ) {
    this.postId = postId;
    this.text = text;
    this.author = author;
    this.isDeleted = isDeleted;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
