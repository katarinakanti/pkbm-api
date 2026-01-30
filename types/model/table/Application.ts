import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { User } from '../../model/table/User'
import { UserApplicant } from '../../model/table/UserApplicant'
import { ApplicationStatus } from '../../model/enum/ApplicationStatus'
import { ApplicationType } from '../../model/enum/ApplicationType'
import { PendidikanTerakhir } from '../../model/enum/PendidikanTerakhir'
import { StudentStatus } from '../../model/enum/StudentStatus'
import { Admin } from '../../model/table/Admin'

@Entity('Application')
export class Application extends BaseEntity {
  @Column({
    type: 'bigint',
    nullable: false,
  })
  @PrimaryGeneratedColumn('increment')
  id!: number;
  @ManyToOne(() => User, x => x.id, { nullable: false })
  @JoinColumn({ name: 'id_user' })
  otm_id_user?: User;
  @Column({
    name: 'id_user',
    type: 'bigint',
    nullable: false,
  })
  id_user!: number;
  @ManyToOne(() => UserApplicant, x => x.id, { nullable: false })
  @JoinColumn({ name: 'id_user_applicant' })
  otm_id_user_applicant?: UserApplicant;
  @Column({
    name: 'id_user_applicant',
    type: 'bigint',
    nullable: false,
  })
  id_user_applicant!: number;
  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    nullable: false,
    default: 'SUBMITTED',
  })
  status_application!: ApplicationStatus;
  @Column({
    type: 'enum',
    enum: ApplicationType,
    nullable: false,
  })
  application_type!: ApplicationType;
  @Column({
    type: 'varchar',
    nullable: true,
    length: 10,
  })
  nisn?: string;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 16,
  })
  nik!: string;
  @Column({
    type: 'text',
    nullable: false,
  })
  parent_fullname!: string;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  parent_phone!: string;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 500,
  })
  parent_email!: string;
  @Column({
    type: 'enum',
    enum: PendidikanTerakhir,
    nullable: false,
  })
  pendidikan_terakhir!: PendidikanTerakhir;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 10,
  })
  grade_terakhir!: string;
  @Column({
    type: 'text',
    nullable: false,
  })
  asal_sekolah!: string;
  @Column({
    type: 'enum',
    enum: StudentStatus,
    nullable: false,
  })
  student_status!: StudentStatus;
  @Column({
    type: 'text',
    nullable: true,
  })
  alasan_pindah?: string;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 500,
  })
  kk_url!: string;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 500,
  })
  akta_lahir_url!: string;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 500,
  })
  ktp_ortu_url!: string;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 500,
  })
  photo_url!: string;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 500,
  })
  selfie_url!: string;
  @Column({
    type: 'varchar',
    nullable: true,
    length: 500,
  })
  ijazah_terakhir_url?: string;
  @Column({
    type: 'varchar',
    nullable: true,
    length: 500,
  })
  raport_url?: string;
  @Column({
    type: 'varchar',
    nullable: true,
    length: 500,
  })
  surat_pindah_url?: string;
  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => "NOW()",
  })
  created_at!: Date;
  @Column({
    type: 'timestamp',
    nullable: true,
  })
  verified_at?: Date;
  @ManyToOne(() => Admin, x => x.id, { nullable: true })
  @JoinColumn({ name: 'verified_by' })
  otm_verified_by?: Admin;
  @Column({
    name: 'verified_by',
    type: 'bigint',
    nullable: true,
  })
  verified_by?: number;
  @Column({
    type: 'text',
    nullable: true,
  })
  notes?: string;
  @Column({
    type: 'timestamp',
    nullable: true,
  })
  updated_at?: Date;
  @Column({
    type: 'bool',
    nullable: true,
  })
  payment_status?: boolean;
  @Column({
    type: 'bool',
    nullable: true,
  })
  payment_verification_status?: boolean;
  @Column({
    type: 'timestamp',
    nullable: true,
  })
  paid_at?: Date;
  @Column({
    type: 'varchar',
    nullable: true,
    length: 500,
  })
  payment_proof_url?: string;
}