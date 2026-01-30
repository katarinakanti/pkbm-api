import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { ApplicationType } from '../model/enum/ApplicationType'
import { PendidikanTerakhir } from '../model/enum/PendidikanTerakhir'
import { StudentStatus } from '../model/enum/StudentStatus'
import { Application } from '../model/table/Application'

export class T_userUpdateUserApplicationById_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
export class T_userUpdateUserApplicationById_path {
  @IsNotEmpty({ message: 'id cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'id must be a number (decimal)' })
  id!: number
}
export class T_userUpdateUserApplicationById_body {
  @IsOptional()
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'id_user_applicant must be a number (decimal)' })
  id_user_applicant?: number
  @IsOptional()
  @IsEnum(ApplicationType, { message: 'application_type must be enum ApplicationType' })
  application_type?: ApplicationType
  @IsOptional()
  @IsString({ message: 'nisn must be a string' })
  nisn?: string
  @IsOptional()
  @IsString({ message: 'nik must be a string' })
  nik?: string
  @IsOptional()
  @IsString({ message: 'parent_dad_fullname must be a string' })
  parent_dad_fullname?: string
  @IsOptional()
  @IsString({ message: 'parent_mom_fullname must be a string' })
  parent_mom_fullname?: string
  @IsOptional()
  @IsString({ message: 'parent_phone must be a string' })
  parent_phone?: string
  @IsOptional()
  @IsString({ message: 'parent_email must be a string' })
  parent_email?: string
  @IsOptional()
  @IsEnum(PendidikanTerakhir, { message: 'pendidikan_terakhir must be enum PendidikanTerakhir' })
  pendidikan_terakhir?: PendidikanTerakhir
  @IsOptional()
  @IsString({ message: 'grade_terakhir must be a string' })
  grade_terakhir?: string
  @IsOptional()
  @IsString({ message: 'asal_sekolah must be a string' })
  asal_sekolah?: string
  @IsOptional()
  @IsEnum(StudentStatus, { message: 'student_status must be enum StudentStatus' })
  student_status?: StudentStatus
  @IsOptional()
  @IsString({ message: 'alasan_pindah must be a string' })
  alasan_pindah?: string
  @IsOptional()
  @IsString({ message: 'kk_url must be a string' })
  kk_url?: string
  @IsOptional()
  @IsString({ message: 'akta_lahir_url must be a string' })
  akta_lahir_url?: string
  @IsOptional()
  @IsString({ message: 'ktp_ortu_url must be a string' })
  ktp_ortu_url?: string
  @IsOptional()
  @IsString({ message: 'photo_url must be a string' })
  photo_url?: string
  @IsOptional()
  @IsString({ message: 'selfie_url must be a string' })
  selfie_url?: string
  @IsOptional()
  @IsString({ message: 'ijazah_terakhir_url must be a string' })
  ijazah_terakhir_url?: string
  @IsOptional()
  @IsString({ message: 'raport_url must be a string' })
  raport_url?: string
  @IsOptional()
  @IsString({ message: 'surat_pindah_url must be a string' })
  surat_pindah_url?: string
}

export type T_userUpdateUserApplicationById = (request: {
  headers: T_userUpdateUserApplicationById_headers
  path: T_userUpdateUserApplicationById_path
  body: T_userUpdateUserApplicationById_body
}, response: Response) => Promise<Application | null>;

export const method = 'put';
export const url_path = '/user/application/:id';
export const alias = 'userUpdateUserApplicationById';
