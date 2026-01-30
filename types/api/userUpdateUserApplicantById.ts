import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { Gender } from '../model/enum/Gender'
import { UserApplicant } from '../model/table/UserApplicant'

export class T_userUpdateUserApplicantById_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
export class T_userUpdateUserApplicantById_path {
  @IsNotEmpty({ message: 'id cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'id must be a number (decimal)' })
  id!: number
}
export class T_userUpdateUserApplicantById_body {
  @IsOptional()
  @IsString({ message: 'fullname must be a string' })
  fullname?: string
  @IsOptional()
  @IsString({ message: 'email must be a string' })
  email?: string
  @IsOptional()
  @IsString({ message: 'phone_number must be a string' })
  phone_number?: string
  @IsOptional()
  @IsString({ message: 'address must be a string' })
  address?: string
  @IsOptional()
  @IsEnum(Gender, { message: 'gender must be enum Gender' })
  gender?: Gender
  @IsOptional()
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'birth_date must be a number (decimal)' })
  birth_date?: number
  @IsOptional()
  @IsString({ message: 'birth_place must be a string' })
  birth_place?: string
  @IsOptional()
  @IsString({ message: 'religion must be a string' })
  religion?: string
}

export type T_userUpdateUserApplicantById = (request: {
  headers: T_userUpdateUserApplicantById_headers
  path: T_userUpdateUserApplicantById_path
  body: T_userUpdateUserApplicantById_body
}, response: Response) => Promise<UserApplicant>;

export const method = 'put';
export const url_path = '/user/applicant/:id';
export const alias = 'userUpdateUserApplicantById';
