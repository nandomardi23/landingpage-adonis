// import CategoryFactory  from 'Database/factories/CategoryFactory';
import { string } from '@ioc:Adonis/Core/Helpers';
import Post from 'App/Models/Post'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Post, ({ faker }) => {
  const title = faker.lorem.sentence()
  const slug = string.toSlug(title)
  return {
    title: title,
    slug: slug,
    body: faker.lorem.paragraph(),
  }
}).build()
