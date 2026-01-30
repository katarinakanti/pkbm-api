import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { ApplicationStatus } from '../model/enum/ApplicationStatus'
import { ApplicationType } from '../model/enum/ApplicationType'
import { StudentStatus } from '../model/enum/StudentStatus'
import { Application } from '../model/table/Application'

export class T_adminGetUserApplicationsList_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
export class T_adminGetUserApplicationsList_query {
  @IsOptional()
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'limit must be a number (decimal)' })
  limit?: number
  @IsOptional()
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'offset must be a number (decimal)' })
  offset?: number
  @IsOptional()
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'id_user must be a number (decimal)' })
  id_user?: number
  @IsOptional()
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'id_user_applicant must be a number (decimal)' })
  id_user_applicant?: number
  @IsOptional()
  @IsEnum(ApplicationStatus, { message: 'application_status must be enum ApplicationStatus' })
  application_status?: ApplicationStatus
  @IsOptional()
  @IsEnum(ApplicationType, { message: 'application_type must be enum ApplicationType' })
  application_type?: ApplicationType
  @IsOptional()
  @IsEnum(StudentStatus, { message: 'student_status must be enum StudentStatus' })
  student_status?: StudentStatus
  @IsOptional()
  @IsString({ message: 'created_at must be a string' })
  created_at?: string
  @IsOptional()
  @IsString({ message: 'verified_at must be a string' })
  verified_at?: string
}
class ReturnType_0 {
  @IsNotEmpty({ message: 'total cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'total must be a number (decimal)' })
  total!: number
  @IsNotEmpty({ message: 'data cannot be empty' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Application)
  data!: Application[]
}

export type T_adminGetUserApplicationsList = (request: {
  headers: T_adminGetUserApplicationsList_headers
  query: T_adminGetUserApplicationsList_query
}, response: Response) => Promise<ReturnType_0>;

export const method = 'get';
export const url_path = '/admin/applications';
export const alias = 'adminGetUserApplicationsList';
