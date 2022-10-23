// import  Permission  from 'App/Models/Permission';
import  Role  from 'App/Models/Role';
import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany,ManyToMany,} from '@ioc:Adonis/Lucid/Orm'

export default class Permission extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @manyToMany(() => Role,{
    pivotTable:'permission_roles'
  })
  public role: ManyToMany<typeof Role>

  // @manyToMany(()=> Permission)
  // public permissions : ManyToMany<typeof Permission>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}