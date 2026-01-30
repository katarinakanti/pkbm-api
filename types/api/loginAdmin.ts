import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { Admin } from '../model/table/Admin'

export class T_loginAdmin_body {
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
  @IsNotEmpty({ message: 'admin cannot be empty' })
  @IsObject()
  @ValidateNested()
  @Type(() => Admin)
  admin!: Admin
}

export type T_loginAdmin = (request: {
  body: T_loginAdmin_body
}, response: Response) => Promise<ReturnType_0>;

export const method = 'post';
export const url_path = '/admin/login';
export const alias = 'loginAdmin';
