import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
export default class ProfilesController {
  public async index({view, auth}: HttpContextContract) {
    // const profile = await User.findByOrFail('userId', auth.user!.id)
    const profile = await User.all()
    return view.render('Admin/Profile/index',{profile})
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
