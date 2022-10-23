import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
// import Factory from '@ioc:Adonis/Lucid/Factory'
import CategoryFactory from 'Database/factories/CategoryFactory'

export default class extends BaseSeeder {
  public async run () {
    await CategoryFactory.with('posts', 10).createMany(3);
  }
}
