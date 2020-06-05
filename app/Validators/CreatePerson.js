'use strict'

const { formatters } = use('Validator')

class CreatePerson {

  get rules() {
    return {
      rut: 'required|max:10',
      name: 'required',
      lastName: 'required',
      age: 'required|number',
      course: 'required'
    }
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).send(errorMessages)
  }

  get formatter() {
    return formatters.JsonApi
  }

}

module.exports = CreatePerson
