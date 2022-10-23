import Category from 'App/Models/Category'
import Factory from '@ioc:Adonis/Lucid/Factory'
import PostFactory from './PostFactory'

export default Factory.define(Category, ({ faker }) => {
  return {
    name: faker.lorem.word()
  }
})
.relation('posts', () => PostFactory)
.build()
