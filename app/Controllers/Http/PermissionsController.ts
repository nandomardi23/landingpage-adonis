import { schema } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission'

export default class PermissionsController {
  public async index({ view }: HttpContextContract) {
    const permission = await Permission.query().orderBy('id','asc')

    return view.render('Admin/Permission/index',{permission})
  }

  public async create({ view }: HttpContextContract) {
    const permission = {
      title : ''
    }
    return view.render('Admin/Permission/create',{permission})
  }

  public async store({ request, response, session}: HttpContextContract) {
    const newPermissionSchema = schema.create({
      title : schema.string()
    })
    const payload = await request.validate({schema:newPermissionSchema})
    await Permission.create({
      title: payload.title
    })
    session.flash('success','Data Permission Berhasil ditambahkan')
    return response.redirect().toRoute('permission.index')
  }

  public async show({}: HttpContextContract) {}

  public async edit({view, params}: HttpContextContract) {
    const permission = await Permission.findOrFail(params.id)
    return view.render('Admin/Permission/edit',{permission})
  }

  public async update({request, response, session, params}: HttpContextContract) {
    const newPermissionSchema = schema.create({
      title : schema.string()
    })
    const payload = await request.validate({schema:newPermissionSchema})
    const permission = await Permission.findOrFail(params.id)
    permission.title = payload.title
    permission.save()
    session.flash('succes','Data permission berhasil diubah')
    return response.redirect().toRoute('permission.index')
  }

  public async destroy({response, params,session}: HttpContextContract) {
    const permission = await Permission.findOrFail(params.id)
    permission.delete()

    session.flash('success','Data Berhasil Dihapus')
    return response.redirect().toRoute('permission.index')
  }
}
