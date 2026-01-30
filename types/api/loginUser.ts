import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { User } from '../model/table/User'

export class T_loginUser_body {
  @IsNotEmpty({ message: 'email cannot be empty' })
  @IsString({ message: 'email must be a string' })
  email!: string
  @IsNotEmpty({ message: 'password cannot be empty' })
  @IsString({ message: 'password must be a string' })
  password!: string
}
class ReturnType_0 {
  @IsNotEmpty({ message: 'token cannot be empty' })
  @IsString({ message: 'token must be a string' })
  token!: string
  @IsNotEmpty({ message: 'user cannot be empty' })
  @IsObject()
  @ValidateNested()
  @Type(() => User)
  user!: User
}

export type T_loginUser = (request: {
  body: T_loginUser_body
}, response: Response) => Promise<ReturnType_0>;

export const method = 'post';
export const url_path = '/login';
export const alias = 'loginUser';
