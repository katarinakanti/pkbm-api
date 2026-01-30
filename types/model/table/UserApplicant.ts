import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from "typeorm";
import { User } from '../../model/table/User'
import { Gender } from '../../model/enum/Gender'

@Entity('UserApplicant')
export class UserApplicant extends BaseEntity {
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
    type: 'text',
    nullable: true,
  })
  address?: string;
  @Column({
    type: 'enum',
    enum: Gender,
    nullable: false,
  })
  gender!: Gender;
  @Column({
    type: 'date',
    nullable: false,
  })
  birth_date!: Date;
  @Column({
    type: 'varchar',
    nullable: true,
    length: 500,
  })
  birth_place?: string;
  @Column({
    type: 'varchar',
    nullable: true,
    length: 30,
  })
  religion?: string;
}