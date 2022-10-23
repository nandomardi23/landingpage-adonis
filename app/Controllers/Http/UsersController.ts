import  Database  from '@ioc:Adonis/Lucid/Database';
import Role  from 'App/Models/Role';
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import  Hash  from '@ioc:Adonis/Core/Hash';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import View from '@ioc:Adonis/Core/View'
import User from 'App/Models/User'
// import Query from 'mysql2/typings/mysql/lib/protocol/sequences/Query';


export default class UsersController {
  public async index({view}: HttpContextContract) {
    const user = await User.query().preload('role').orderBy('id','asc')
    // console.log(user)
    // const user = await User.all()
    return view.render('Admin/User/index',{user})
  }

  public async create({view}: HttpContextContract) {
    const user ={
      name: '',
      email:'',
      // password:''
    }
    const role = await Role.all()

    return view.render('Admin/User/create',{
      user,
      role,
    })
  }

  public async store({ request, response, session }: HttpContextContract) {

    // console.log(request.input('role_ids'))
    // console.log(request.body().role_ids)
    const newSchemaUser = await schema.create({
      name: schema.string(),
      email: schema.string([rules.email()]),
    })
    const payload = await request.validate({schema:newSchemaUser})
    const password = await Hash.use('argon').make(payload.email)
    const user = await User.create({
      name:payload.name,
      email:payload.email,
      password: password,
    })
    await user.related('role').sync(request.body().role_ids)
    session.flash('success','Data User Berhasil Ditambahkan')
    return response.redirect().toRoute('user.index')
  }

  public async show({params, view}: HttpContextContract) {
    const user = await User.findOrFail(params.id)
      await user.load('role')
    const roles = await Role.all()
    // const role = await user.related('role').query()
    const role_users = [user]
    // con
    console.log(role_users)

    // console.log(user.related('role').query().wherePivot('id','role_id=?',[params.id]))
    return view.render('Admin/User/show',{
      user,
      role_users,
      roles
    })
    
  }

  public async edit({view, params}: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    const role = await Role.all()
    const raw_role = await Database.rawQuery('select * from role_users where user_id =?',[params.id])
    const role_users = []
    raw_role[0].map(d =>{
      role_users.push(d.role_id)
    })
    return view.render('Admin/User/edit',
    {
      user,
      role,
      role_users
    })
  }

  public async update({request, response, session,params}: HttpContextContract) {
  
    const newSchemaUser = await schema.create({
      name: schema.string(),
      email: schema.string({},[rules.email()]),
    })

    const payload = await request.validate({schema:newSchemaUser})

    const user = await User.findOrFail(params.id)
    user.name = payload.name
    user.email= payload.email
    user.save()

    await user.related('role').sync(request.body().role_ids)
    
    session.flash('success','Data user berhasil diubah')
    return response.redirect().toRoute('user.index')
  }

  public async destroy({ params, response,session }: HttpContextContract) {
    const id = params.id
    const user = await User.findOrFail(id)
    await user.delete()
    session.flash('succes','Data user berhasil dihapus')
    response.redirect().toRoute('user.index')

  }
}
