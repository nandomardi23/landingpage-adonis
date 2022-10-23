import { DateTime } from 'luxon'
import Role from 'App/Models/Role'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel,manyToMany,ManyToMany } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public name:string

  @column()
  public email:string

  @column({serializeAs:null})
  public photo:string

  @column({ serializeAs: null })
  public password:string

  @column()
  public rememberMeToken?:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //many to many role
  @manyToMany(() => Role,{
    pivotTable:'role_users'
  })
  public role: ManyToMany<typeof Role>



  @beforeSave()
  public static async hashPassword (User: User) {
    if (User.$dirty.password) {
      User.password = await Hash.make(User.password)
    }
  }
}
