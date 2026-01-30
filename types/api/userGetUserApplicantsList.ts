import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { UserApplicant } from '../model/table/UserApplicant'

export class T_userGetUserApplicantsList_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}

export type T_userGetUserApplicantsList = (request: {
  headers: T_userGetUserApplicantsList_headers
}, response: Response) => Promise<UserApplicant[]>;

export const method = 'get';
export const url_path = '/user/applicants';
export const alias = 'userGetUserApplicantsList';
