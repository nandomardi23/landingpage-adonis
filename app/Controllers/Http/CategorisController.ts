import { schema, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'


export default class CategorisController {
  public async index({view}: HttpContextContract) {
      const category = await Category.query().orderBy('id','asc')
      return view.render('Admin/Categories/index',{category})
  }

  public async create({view}: HttpContextContract) {
    const category = {
      name :''
    }
    return view.render('Admin/Categories/create',{category})
  }
  

  public async store({ request, response,session }: HttpContextContract) {
    const newCategorySchema = schema.create({
      name: schema.string([rules.required()]),
    })
    const payload =await request.validate({schema:newCategorySchema})
    await Category.create({
      name:payload.name
    })
    session.flash('success','Kategori Berhasil Ditambahkan')
    return response.redirect().toRoute('category.index')
    // response.redirect().toRoute('category.index')
  }

  public async show({}: HttpContextContract) {}

  public async edit({view, params}: HttpContextContract) {
    const category = await Category.findOrFail(params.id)
    return view.render('Admin/Categories/edit',{category})
  }

  public async update({ request , response, params, session}: HttpContextContract) {
    const newCategorySchema = schema.create({
      name: schema.string([rules.required()]),
    })
    const payload = await request.validate({schema : newCategorySchema})
    const category = await Category.findOrFail(params.id)
    category.name = payload.name
    await category.save()
    session.flash('success','Kategori Berhasil Diubah')
    return response.redirect().toRoute('category.index')

  }

  public async destroy({ session,response, params}: HttpContextContract) {
    const category = await Category.findOrFail(params.id)
    await category.delete()
    session.flash('success','Kategori Berhasil Dihapus')
    return response.redirect().toRoute('category.index')
  }
}
