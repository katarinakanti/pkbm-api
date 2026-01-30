import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from "typeorm";

@Entity('Admin')
export class Admin extends BaseEntity {
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
    nullable: false,
    length: 500,
  })
  password!: string;
  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => "NOW()",
  })
  created_at!: Date;
}