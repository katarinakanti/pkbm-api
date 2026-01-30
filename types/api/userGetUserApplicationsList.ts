import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { ApplicationStatus } from '../model/enum/ApplicationStatus'
import { ApplicationType } from '../model/enum/ApplicationType'
import { Application } from '../model/table/Application'

export class T_userGetUserApplicationsList_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
export class T_userGetUserApplicationsList_query {
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
  @IsNumber({}, { message: 'id_user_applicant must be a number (decimal)' })
  id_user_applicant?: number
  @IsOptional()
  @IsEnum(ApplicationStatus, { message: 'status_application must be enum ApplicationStatus' })
  status_application?: ApplicationStatus
  @IsOptional()
  @IsEnum(ApplicationType, { message: 'application_type must be enum ApplicationType' })
  application_type?: ApplicationType
  @IsOptional()
  @IsString({ message: 'created_at must be a string' })
  created_at?: string
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

export type T_userGetUserApplicationsList = (request: {
  headers: T_userGetUserApplicationsList_headers
  query: T_userGetUserApplicationsList_query
}, response: Response) => Promise<ReturnType_0>;

export const method = 'get';
export const url_path = '/user/applications';
export const alias = 'userGetUserApplicationsList';
