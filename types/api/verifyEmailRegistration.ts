import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";

export class T_verifyEmailRegistration_body {
  @IsNotEmpty({ message: 'email cannot be empty' })
  @IsString({ message: 'email must be a string' })
  email!: string
  @IsNotEmpty({ message: 'verification_token cannot be empty' })
  @IsString({ message: 'verification_token must be a string' })
  verification_token!: string
}

export type T_verifyEmailRegistration = (request: {
  body: T_verifyEmailRegistration_body
}, response: Response) => Promise<boolean>;

export const method = 'post';
export const url_path = '/verify-registration-email';
export const alias = 'verifyEmailRegistration';
