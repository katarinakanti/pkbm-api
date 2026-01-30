import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { Application } from '../model/table/Application'

export class T_adminVerifyPayment_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
export class T_adminVerifyPayment_path {
  @IsNotEmpty({ message: 'id cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'id must be a number (decimal)' })
  id!: number
}
export class T_adminVerifyPayment_body {
  @IsNotEmpty({ message: 'payment_verification_status cannot be empty' })
  @Transform((param?: any): boolean | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : (param?.value === 'true' || ((typeof param?.value === 'boolean') && param?.value)))
  @IsBoolean({ message: 'payment_verification_status must be a boolean' })
  payment_verification_status!: boolean
}

export type T_adminVerifyPayment = (request: {
  headers: T_adminVerifyPayment_headers
  path: T_adminVerifyPayment_path
  body: T_adminVerifyPayment_body
}, response: Response) => Promise<Application>;

export const method = 'put';
export const url_path = '/admin/application/payment/:id';
export const alias = 'adminVerifyPayment';
