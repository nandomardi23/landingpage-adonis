import  Setting from 'App/Models/Setting';
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
   await Setting.create({
    name : "data",
    logo : "default.jpg",
   })
  }
}
