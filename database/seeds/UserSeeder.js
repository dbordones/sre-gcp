'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */

const Hash = use('Hash')
const randomstring = require("randomstring");
let Sha1 = require("crypto-js/sha1");
const User = use('App/Models/User')

class UserSeeder {
  async run() {
    
    const RndString = randomstring.generate(32)
    const UserProfile = new User()
    UserProfile.email = 'api-admin@dalbordones.com'
    UserProfile.password = await Hash.make('123456789')
    UserProfile.apikey = Sha1(RndString).toString().toUpperCase()
    await UserProfile.save()

  }
}

module.exports = UserSeeder
