import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { ApplicationStatus } from '../model/enum/ApplicationStatus'
import { Application } from '../model/table/Application'

export class T_adminVerifyApplicationById_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
export class T_adminVerifyApplicationById_path {
  @IsNotEmpty({ message: 'id_application cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'id_application must be a number (decimal)' })
  id_application!: number
}
export class T_adminVerifyApplicationById_body {
  @IsNotEmpty({ message: 'application_status cannot be empty' })
  @IsEnum(ApplicationStatus, { message: 'application_status must be enum ApplicationStatus' })
  application_status!: ApplicationStatus
  @IsOptional()
  @IsString({ message: 'notes must be a string' })
  notes?: string
}

export type T_adminVerifyApplicationById = (request: {
  headers: T_adminVerifyApplicationById_headers
  path: T_adminVerifyApplicationById_path
  body: T_adminVerifyApplicationById_body
}, response: Response) => Promise<Application>;

export const method = 'put';
export const url_path = '/admin/application/:id_application';
export const alias = 'adminVerifyApplicationById';
