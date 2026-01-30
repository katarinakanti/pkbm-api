import { Response } from "express";
import { ClassConstructor, Transform, Type, plainToInstance } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsBoolean, IsOptional, IsISO8601, IsString, IsEnum, ValidateNested, IsArray, ValidationError, validateOrReject } from "class-validator";
import { ApplicationType } from '../model/enum/ApplicationType'
import { PendidikanTerakhir } from '../model/enum/PendidikanTerakhir'
import { StudentStatus } from '../model/enum/StudentStatus'
import { Application } from '../model/table/Application'

export class T_userCreateApplication_headers {
  @IsNotEmpty({ message: 'authorization cannot be empty' })
  @IsString({ message: 'authorization must be a string' })
  authorization!: string
}
export class T_userCreateApplication_body {
  @IsNotEmpty({ message: 'id_user cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'id_user must be a number (decimal)' })
  id_user!: number
  @IsNotEmpty({ message: 'id_user_applicant cannot be empty' })
  @Transform((param?: any): number | null => (param?.value === null || param?.value === undefined || param?.value === '') ? null : parseFloat(param.value))
  @IsNumber({}, { message: 'id_user_applicant must be a number (decimal)' })
  id_user_applicant!: number
  @IsNotEmpty({ message: 'application_type cannot be empty' })
  @IsEnum(ApplicationType, { message: 'application_type must be enum ApplicationType' })
  application_type!: ApplicationType
  @IsOptional()
  @IsString({ message: 'nisn must be a string' })
  nisn?: string
  @IsNotEmpty({ message: 'nik cannot be empty' })
  @IsString({ message: 'nik must be a string' })
  nik!: string
  @IsNotEmpty({ message: 'parent_fullname cannot be empty' })
  @IsString({ message: 'parent_fullname must be a string' })
  parent_fullname!: string
  @IsNotEmpty({ message: 'parent_phone cannot be empty' })
  @IsString({ message: 'parent_phone must be a string' })
  parent_phone!: string
  @IsNotEmpty({ message: 'parent_email cannot be empty' })
  @IsString({ message: 'parent_email must be a string' })
  parent_email!: string
  @IsNotEmpty({ message: 'pendidikan_terakhir cannot be empty' })
  @IsEnum(PendidikanTerakhir, { message: 'pendidikan_terakhir must be enum PendidikanTerakhir' })
  pendidikan_terakhir!: PendidikanTerakhir
  @IsNotEmpty({ message: 'grade_terakhir cannot be empty' })
  @IsString({ message: 'grade_terakhir must be a string' })
  grade_terakhir!: string
  @IsNotEmpty({ message: 'asal_sekolah cannot be empty' })
  @IsString({ message: 'asal_sekolah must be a string' })
  asal_sekolah!: string
  @IsNotEmpty({ message: 'student_status cannot be empty' })
  @IsEnum(StudentStatus, { message: 'student_status must be enum StudentStatus' })
  student_status!: StudentStatus
  @IsOptional()
  @IsString({ message: 'alasan_pindah must be a string' })
  alasan_pindah?: string
  @IsNotEmpty({ message: 'kk_url cannot be empty' })
  @IsString({ message: 'kk_url must be a string' })
  kk_url!: string
  @IsNotEmpty({ message: 'akta_lahir_url cannot be empty' })
  @IsString({ message: 'akta_lahir_url must be a string' })
  akta_lahir_url!: string
  @IsNotEmpty({ message: 'ktp_ortu_url cannot be empty' })
  @IsString({ message: 'ktp_ortu_url must be a string' })
  ktp_ortu_url!: string
  @IsNotEmpty({ message: 'photo_url cannot be empty' })
  @IsString({ message: 'photo_url must be a string' })
  photo_url!: string
  @IsNotEmpty({ message: 'selfie_url cannot be empty' })
  @IsString({ message: 'selfie_url must be a string' })
  selfie_url!: string
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

export type T_userCreateApplication = (request: {
  headers: T_userCreateApplication_headers
  body: T_userCreateApplication_body
}, response: Response) => Promise<Application | null>;

export const method = 'post';
export const url_path = '/user/application';
export const alias = 'userCreateApplication';
