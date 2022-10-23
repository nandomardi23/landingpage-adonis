import  Database  from '@ioc:Adonis/Lucid/Database';
import { schema } from '@ioc:Adonis/Core/Validator';
import  Permission  from 'App/Models/Permission';
import  Role  from 'App/Models/Role';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RolesController {
  public async index({view}: HttpContextContract) {
    const roles = await Role.query().preload('permission').orderBy('id','asc')
    return view.render('Admin/Roles/index',{roles})
  }

  public async create({view}: HttpContextContract) {
    const role = {
      title:''
    }
    const permission = await Permission.all()
    return view.render('Admin/Roles/create',{
      role,
      permission
    })
  }

  public async store({request, response,session,}: HttpContextContract) {
    const RoleSchema = schema.create({
      title: schema.string()
    })
    const payload = await request.validate({schema:RoleSchema})
    const role = await Role.create({
      title:payload.title
    })
    await role.related('permission').sync(request.body().permission_ids)
    session.flash('success','Data Role Berhasil Ditambahkan')
    return response.redirect().toRoute('role.index')
  }

  public async show({}: HttpContextContract) {}

  public async edit({view, params}: HttpContextContract) {
    const role = await Role.findOrFail(params.id)
    const permission = await Permission.all()
    
    let raw_permission_roles = await Database.rawQuery('select * from permission_roles where role_id = ?',[params.id])
    let permission_roles = [];
    raw_permission_roles[0].map(d =>{
      permission_roles.push(d.permission_id);
    });

    return view.render('Admin/Roles/edit',{
      role,
      permission,
      permission_roles
    })
  }

  public async update({request,response,session,params}: HttpContextContract) {
    const RoleSchema = schema.create({
      title: schema.string()
    })
    const payload = await request.validate({schema:RoleSchema})
    const role = await Role.findOrFail(params.id)
    role.title = payload.title
    await role.save()

    await role.related('permission').sync(request.body().permission_ids)

    session.flash('success','Data role berhasil diupdate')
    return response.redirect().toRoute('role.index')
  }

  public async destroy({response,params,session,request}: HttpContextContract) {
    const role = await Role.findOrFail(params.id)
    role.delete()
    session.flash('success','Data berhasil dihapus')
    return response.redirect().toRoute('role.index')
  }
}
