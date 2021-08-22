import { DateTime } from 'luxon'
import {BaseModel, beforeCreate, column} from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid4 } from 'uuid'

export enum UserType {
  MASTER = "MASTER",
  ADMIN = "ADMIN",
  STAFF = "STAFF"
}

export default class User extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public username: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public type: UserType

  @beforeCreate()
  public static async createUUID(model: User) {
    if (!model.id) {
      model.id = uuid4()
    }
  }
}
