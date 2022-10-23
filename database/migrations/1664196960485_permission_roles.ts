import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'permission_roles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('role_id').unsigned().references('roles.id').onDelete('CASCADE')
      table.integer('permission_id').unsigned().references('permissions.id').onDelete('CASCADE')
      table.timestamps()
      
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
