import { schema } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Setting from 'App/Models/Setting'
import Application from '@ioc:Adonis/Core/Application'
// import fs from 'fs'


export default class SettingsController {
  public async index({view}: HttpContextContract) {
    const setting = await Setting.findOrFail({'id':1})
    return view.render('Admin/Setting/index',{setting})
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async updateName({request,response,params,session}:HttpContextContract){
    const newShcemaNameSetting = schema.create({
      name: schema.string()
    })
    const payload = await request.validate({schema:newShcemaNameSetting})
    const setiing = await Setting.findOrFail(params.id)
    setiing.name = payload.name
    setiing.save()
    session.flash('success','Data Nama Company berhasil Dirubah')
    return response.redirect().toRoute('setting.index')
  }

  public async updateLogo({request, response,params,session}:HttpContextContract){
    const newShcemaLogoSetting = schema.create({
      logo:schema.file({
        size:'10mb', extnames:['jpg','png','giff']
      })
    })
    const payload = await request.validate({schema:newShcemaLogoSetting})
    const setting = await Setting.findOrFail(params.id)
    
    const image = request.file('logo');
    
    if (image) {
      await image.moveToDisk('./', {
        name: `logo.${image.extname}`,
        contentType: `${image.type}`
      }, 'local');
    }
      setting.logo = `logo.${(image) ? image.extname : ''}`;
      setting.save()
    const path = Application.tmpPath('uploads')+'/'+setting.logo

    
    session.flash('success','Logo Berhasil diganti')
    return response.redirect().toRoute('setting.index')

  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
