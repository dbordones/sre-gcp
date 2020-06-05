'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PersonSchema extends Schema {
  up () {
    this.create('person', (collection) => {
      collection.index('rut_index', { rut: 1})
    })
  }

  down () {
    this.drop('person')
  }
}

module.exports = PersonSchema
