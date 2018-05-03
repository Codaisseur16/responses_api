import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'

@Entity()
export default class Responses extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('int')
  user_id: number

  @Column('boolean', {nullable:false})
  teacher: boolean

  @Column('int')
  quiz_id: number

  @Column('json', {nullable:true})
  answers: JSON

  @Column('int')
  score: number

  
  
}