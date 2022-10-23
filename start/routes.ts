import  Route  from '@ioc:Adonis/Core/Route';
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/


// Route.resource('/','Landing/HomeController'  )
Route.get('/','Landing/HomeController.index' ).as('landing.home')

Route.get('/posted','Landing/PostedsController.index').as('landing.posts')
Route.get('/posted/detail/:id','Landing/PostedsController.show').as('landing.posts.show')
Route.get('/galleries','Landing/GalleriesController.index').as('landing.galleries')



// akhir resource 
// route auth
Route.get('register','AuthController.registerShow').as('auth.register.show')
Route.post('register','AuthController.register').as('auth.register')
Route.get('login','AuthController.loginShow').as('auth.login.show')
Route.post('login','AuthController.login').as('auth.login')
Route.get('logout','AuthController.logout').as('auth.logout')
// akhir route auth

// route category
Route.resource('/category','CategorisController').except(['show'])
// akhir route category

// route user
Route.resource('/user','UsersController')
// akhir route user

// route permission
Route.resource('/permission','PermissionsController')
// akhir route permission

// route profile
Route.get('profile','ProfilesController.index').as('profile.index')
//akhir route profile

// route setting
Route.get('setting/','SettingsController.index').as('setting.index')
Route.put('setting/nameUpdate/:id','SettingsController.updateName').as('setting.updateName')
Route.put('setting/updateLogo/:id','SettingsController.updateLogo').as('setting.logo')
//akhir route setting

// route post
Route.resource('post','PostsController').except(['show'])
//akhir route post

// route gallery
Route.resource('gallery','GalleriesController').except(['show'])
// akhir route gallery


// route role
Route.resource('role','RolesController')
// route akhir role