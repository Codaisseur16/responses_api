import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'

@Entity()
export default class Responses extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text')
  user_id: number

  @Column('text')
  quiz_id: number

  @Column('json')
  answers: JSON

  @Column('text')
  score: number
}