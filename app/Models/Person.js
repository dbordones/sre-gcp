'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Person extends Model {
    static get collection() {
        return 'person'
    }

}

module.exports = Person
