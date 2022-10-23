import  Post  from 'App/Models/Post';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import { bind } from '@adonisjs/route-model-binding';

export default class PostedsController {
  public async index({view}: HttpContextContract) {
    const post = await Post.query().preload('category').orderBy('id','asc')

    return view.render('landing/post',{post})
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  // @bind()
  public async show({view, params}: HttpContextContract) {
    // const post = await Post.$relationsDefinitions
    const post = await (await Post.findOrFail(params.id))
    await post.load('category')

    const post_2 = await Post.query().preload('category').orderBy('id','asc').limit(5)
    // const category = await post.load('category')
    return view.render('landing/detail_post',{
      post,
      post_2,
    })
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
