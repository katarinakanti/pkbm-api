import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { Application } from '../model/table/Application'

export class T_userMakePayment_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
export class T_userMakePayment_path {
  @IsNotEmpty({ message: 'id cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'id must be a number (decimal)' })
  id!: number
}
export class T_userMakePayment_body {
  @IsNotEmpty({ message: 'payment_proof_url cannot be empty' })
  @IsString({ message: 'payment_proof_url must be a string' })
  payment_proof_url!: string
}

export type T_userMakePayment = (request: {
  headers: T_userMakePayment_headers
  path: T_userMakePayment_path
  body: T_userMakePayment_body
}, response: Response) => Promise<Application>;

export const method = 'put';
export const url_path = '/user/application/payment/:id';
export const alias = 'userMakePayment';
