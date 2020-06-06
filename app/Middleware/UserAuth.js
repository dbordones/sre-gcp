'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const User = use('App/Models/User')

class UserAuth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response }, next) {
  
    const apikey = request.header('X-API-KEY')
    
    if (!apikey){
      return response.status(401).send()
    }
    else
    {
      const UserSeek = await User.where('apikey').eq(apikey).first()
      if (!UserSeek){
        return response.status(401).send()
      }
    }

    // call next to advance the request
    await next()
  }
}

module.exports = UserAuth
