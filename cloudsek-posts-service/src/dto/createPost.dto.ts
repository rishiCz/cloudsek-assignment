import {IsEmpty, IsNotEmpty, IsString, IsUrl } from "class-validator";
import { IsUrlFormat } from "../validator/url-validator";

export class CreatePostDTO {

  @IsUrlFormat()
  @IsNotEmpty()
  @IsString()
  readonly image: string;


  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @IsEmpty()
  readonly isDeleted: Boolean;

  @IsEmpty()
  readonly createdAt: Date;
 
  @IsEmpty()
  readonly updatedAt: Date;

  constructor(
    image: any,
    title: any,
    author: any,
    isDeleted: any,
    createdAt: any,
    updatedAt: any
  ) {
    this.image = image;
    this.title = title;
    this.author = author;
    this.isDeleted = isDeleted;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
