'use strict'

const { formatters } = use('Validator')

class UpdatePerson {

  get rules() {
    return {
      rut: 'max:12',
      age: 'number'
    }
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).send(errorMessages)
  }

  get formatter() {
    return formatters.JsonApi
  }

}

module.exports = UpdatePerson
