import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import  { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
    public async registerShow({view}:HttpContextContract) {
        return view.render('Auth/register')
    }

    public async register({request, response, auth}:HttpContextContract){
        const userSchema = schema.create({
            name: schema.string({trim:true},[rules.minLength(5), rules.maxLength(25)]),
            email: schema.string({trim:true}, [rules.email()]),
            password: schema.string({trim:true}, [rules.minLength(8)])

        })
        const data = await request.validate({schema:userSchema})
        const user = await User.create(data)

        await auth.login(user)

        return response.redirect().toRoute('/')

    }

    public async loginShow({view}:HttpContextContract) {
        return view.render('Auth/login')
    }

    public async login({request, response, auth, session}:HttpContextContract){
        const { email, password } = request.only(['email', 'password'])

        try {
            await auth.attempt(email, password)
        }catch (error) {
            session.flash('form', 'your Email or password is incorrect ')

            return response.redirect().back()
        }

        return response.redirect('/profile')
    }

    public async logout({response, auth}:HttpContextContract){
        await auth.logout()

        return response.redirect().toRoute('auth.login.show')
    }
}
