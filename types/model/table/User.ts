import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from "typeorm";

@Entity('User')
export class User extends BaseEntity {
  @Column({
    type: 'bigint',
    nullable: false,
  })
  @PrimaryGeneratedColumn('increment')
  id!: number;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 500,
  })
  fullname!: string;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 500,
  })
  email!: string;
  @Column({
    type: 'varchar',
    nullable: true,
    length: 100,
  })
  phone_number?: string;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 500,
  })
  password!: string;
  @Column({
    type: 'varchar',
    nullable: false,
    length: 500,
  })
  email_verification_token!: string;
  @Column({
    type: 'varchar',
    nullable: true,
    length: 500,
  })
  email_reset_password_token?: string;
  @Column({
    type: 'varchar',
    nullable: true,
    length: 10,
  })
  update_email_otp?: string;
  @Column({
    type: 'varchar',
    nullable: true,
    length: 100,
  })
  update_email_token?: string;
  @Column({
    type: 'timestamp',
    nullable: true,
  })
  verified_at?: Date;
  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => "NOW()",
  })
  created_at!: Date;
}