import Gallery from 'App/Models/Gallery';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GalleriesController {

  public async index({view}: HttpContextContract) {
    const gallery = await Gallery.query().orderBy('id','asc')

    return view.render('landing/gallery',{gallery})
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
