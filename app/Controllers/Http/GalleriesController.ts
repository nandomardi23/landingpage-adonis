import { schema } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Gallery from 'App/Models/Gallery'
import fs from 'fs'
import  Application  from '@ioc:Adonis/Core/Application';


export default class GalleriesController {
  public async index({view}: HttpContextContract) {
    const gallery = await Gallery.query().orderBy('id','asc')
    return view.render('Admin/Gallery/index',{gallery})
  }

  public async create({view}: HttpContextContract) {
    const gallery = {
      name : '',
    }
      return view.render('Admin/Gallery/create',{gallery})
  }

  public async store({request, response, session}: HttpContextContract) {
    const gallerySchema = schema.create({
      name:schema.file({size:'10mb', extnames:['jpg','png','giff']})
    })
    const payload = request.validate({schema:gallerySchema})
    await (await payload).name.moveToDisk('/gallery')
    const fileName = (await payload).name.fileName;

    await Gallery.create({
      name:fileName
    })

    session.flash('success','Gallery baru berhasil ditambahkan')
    return response.redirect().toRoute('gallery.index')

  }

  public async show({}: HttpContextContract) {}

  public async edit({view,params}: HttpContextContract) {
    const gallery = await Gallery.findOrFail(params.id)

    return view.render('Admin/Gallery/edit',{gallery})
  }

  public async update({request, response,session,params}: HttpContextContract) {

    const gallerySchema = schema.create({
      name:schema.file({size:'10mb', extnames:['jpg','png','giff']})
    })
    const payload = request.validate({schema:gallerySchema})

    await (await payload).name.moveToDisk('/gallery')
    const filename = await (await payload).name.fileName
    const gallery = await Gallery.findOrFail(params.id)
    const path = Application.tmpPath('uploads') + '/gallery/' + gallery.name

    try{
      await fs.unlinkSync(path)
      gallery.name = filename
      gallery.save()
      console.log(__dirname)
      console.log(__filename)
    }catch(err){
      console.error(err)
    }
    // fs.unlinkSync("/uploads/gallery/"+gallery.name)



    session.flash('success','Gallery  berhasil dirubah')
    return response.redirect().toRoute('gallery.index')
  }

  public async destroy({response,session, params}: HttpContextContract) {
    const gallery = await Gallery.findOrFail(params.id)
    const path = Application.tmpPath('uploads')+'/gallery/'+gallery.name

    try {
      await fs.unlinkSync(path)
      gallery.delete()
    } catch (error) {
      console.log(error)
    }

    session.flash('success','Data galerry berhasil dihapuskan')
    return response.redirect().toRoute('gallery.index')
  }
}
