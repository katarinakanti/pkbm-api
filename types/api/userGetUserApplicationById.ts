import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { Application } from '../model/table/Application'

export class T_userGetUserApplicationById_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
export class T_userGetUserApplicationById_path {
  @IsNotEmpty({ message: 'id cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'id must be a number (decimal)' })
  id!: number
}

export type T_userGetUserApplicationById = (request: {
  headers: T_userGetUserApplicationById_headers
  path: T_userGetUserApplicationById_path
}, response: Response) => Promise<Application | null>;

export const method = 'get';
export const url_path = '/user/application/:id';
export const alias = 'userGetUserApplicationById';
