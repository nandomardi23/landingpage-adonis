import {  schema} from '@ioc:Adonis/Core/Validator';
import { string } from '@ioc:Adonis/Core/Helpers'
import  Category  from 'App/Models/Category';
import  Post  from 'App/Models/Post';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PostsController {
  public async index({view}: HttpContextContract) {
  
    const post = await Post.query().preload('category').orderBy('id','asc')
    // console.log(post.category.name)
    return view.render('Admin/Post/index',{post})
  }

  public async create({view}: HttpContextContract) {
    const post = {
      title:'',
      body:'',
      category_id:''
    }
    const category = await Category.all()
    return view.render('Admin/Post/create',{category,post})
  }

  public async store({request, response, session }: HttpContextContract) {
    
    const newPostSchema = schema.create({
      title : schema.string(),
      category_id:schema.number(),
      body:schema.string(),
      // slug:schema.string()
    })

    const payload = await request.validate({schema:newPostSchema})

    await Post.create({
      title:payload.title,
      slug: string.toSlug(payload.title),
      categoryId: payload.category_id,
      body: payload.body
    })
    session.flash('success', 'Berhasil Menabahkan Post Baru')
    return response.redirect().toRoute('post.index')
  }

  public async show({}: HttpContextContract) {}

  public async edit({view, params}: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    const category = await Category.all()
    return view.render('Admin/Post/edit',{post,category})
  }

  public async update({params, request, response, session}: HttpContextContract) {
    const newPostSchema = schema.create({
      title : schema.string(),
      category_id:schema.number(),
      body:schema.string()
      // slug:schema.string()
    })

    const payload = await request.validate({schema:newPostSchema})

    const post = await Post.findOrFail(params.id)
    post.title = payload.title,
    post.slug = string.toSlug(payload.title),
    post.categoryId = payload.category_id,
    post.body = payload.body
    await post.save()

    session.flash('success','Berhasil Mengumbah Data Post')
    return response.redirect().toRoute('post.index')
  }

  public async destroy({response, params, session}: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    await post.delete()
    session.flash('success', 'Berhasil Menghapus Data Post')
    return response.redirect().toRoute('post.index')
  }
}
