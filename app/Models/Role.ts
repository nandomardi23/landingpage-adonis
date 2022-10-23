import  User  from 'App/Models/User';
import  Permission  from 'App/Models/Permission';
import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany,ManyToMany,} from '@ioc:Adonis/Lucid/Orm'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string
// many to many permission
  @manyToMany(() => Permission, {
    pivotTable: 'permission_roles',
  })
  public permission: ManyToMany<typeof Permission>

//many to many user
  @manyToMany(() => User, {
    pivotTable: 'role_users',
  })
  public user: ManyToMany<typeof User>
  
  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
