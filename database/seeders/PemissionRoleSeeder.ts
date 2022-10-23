import Permission from 'App/Models/Permission';
import  Role  from 'App/Models/Role';
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User';
import Hash from '@ioc:Adonis/Core/Hash';

export default class extends BaseSeeder {
  public async run () {

    const permissions = await Permission.createMany([
        {title: 'dashboard_view'},
        {title: 'role_view'},
        {title: 'role_create'},
        {title: 'role_update'},
        {title: 'role_delete'},
        {title: 'permission_view'},
        {title: 'permission_create'},
        {title: 'permission_update'},
        {title: 'permission_delete'},
        {title: 'user_view'},
        {title: 'user_create'},
        {title: 'user_update'},
        {title: 'user_delete'},
      ]);

    const role = await Role.create({
        title: 'admin'
      });
    
    const admin = await User.create({
      name: 'admin',
      email:'admin@example.com',
      password: await Hash.use('argon').make('admin@example.com')
    });

    await admin.related('role').sync([role.id]);

    let adminPermisisons: number[] = [];
    permissions.map(permission => {
      return adminPermisisons.push(permission.id);
    });

    role.related('permission').sync(adminPermisisons);
  }
}
