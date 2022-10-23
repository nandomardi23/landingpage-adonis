import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('category_id').unsigned().references('categories.id').onDelete('CASCADE')
      table.string('title')
      table.string('slug')
      table.text('body')
      table.timestamps()
      // table.foreign('category_id').references('categories.id').onDelete('CASCADE')
      
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
