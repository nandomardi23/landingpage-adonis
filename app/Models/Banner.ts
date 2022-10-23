import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Banner extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public banner1: string

  @column()
  public banner2: string

  @column()
  public banner3: string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
