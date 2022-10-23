// import  Category  from 'App/Models/Category';
// import  string  from '@ioc:Adonis/Core/Helpers'
// import  Category  from 'App/Models/Category';
import  Gallery  from 'App/Models/Gallery';
import  Post  from 'App/Models/Post';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {
  public async index({view}: HttpContextContract) {
    // const test = await string.truncate({Post.preload('cate')})
    const one = await Post.query().preload('category').orderBy('id','asc').first()
    const seconde = await Post.query().preload('category').orderBy('id','asc').limit(2)
    const post = await Post.query().preload('category').orderBy('id','asc').limit(6)
    const gallery = await Gallery.query().orderBy('id','asc').limit(6)
    return view.render('landing/index',{
      one,
      seconde,
      post,
      gallery,
    })
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {
    // const post = await Post.query().preload('category')
    // post.fin
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
