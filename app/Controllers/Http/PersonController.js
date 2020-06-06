'use strict'

const Person = use('App/Models/Person')

const { validate, clean } = require('rut.js')

class PersonController {

    async list({ request, response }) {
        let People = await Person.all()
        return response.status(200).json(People)
    }

    async seek({ params, response }){

        const { rut } = params 
        
        if (!validate(rut)) return response.status(400).send()
        
        let PersonSeek = await Person.where('rut').eq(clean(rut)).first()

        if (!PersonSeek){
            return response.status(404).send()
        }

        return response.status(200).send(PersonSeek)
    }

    async create({ request, response }) {

        const PersonInfo = request.only(['rut', 'name', 'lastName', 'age', 'course'])

        if (!validate(PersonInfo.rut)) return response.status(400).send()

        let PersonSeek = await Person.where('rut').eq(PersonInfo.rut).first()

        if (!PersonSeek) {

            const PersonProfile = new Person()
            PersonProfile.rut = clean(PersonInfo.rut)
            PersonProfile.name = PersonInfo.name
            PersonProfile.lastName = PersonInfo.lastName
            PersonProfile.age = PersonInfo.age
            PersonProfile.course = PersonInfo.course

            await PersonProfile.save()

            return response.status(201).send()
        }
        else {
            return response.status(400).send()
        }
    }

    async update ({ params, request, response}){
        const { id } = params
        let PersonSeek = new Person()
            PersonSeek = await Person.find(id)

        if (!PersonSeek){
            return response.status(404).send()
        }
        else{

            const PersonInfo = request.only(['rut', 'name', 'lastName', 'age', 'course'])
            
            if ((PersonInfo.rut) && (!validate(PersonInfo.rut))) {
                return response.status(400).send()
            }

            if (PersonInfo.rut) PersonSeek.rut = clean(PersonInfo.rut)
            if (PersonInfo.name) PersonSeek.name = PersonInfo.name
            if (PersonInfo.lastName) PersonSeek.lastName = PersonInfo.lastName
            if (PersonInfo.age) PersonSeek.age = PersonInfo.age
            if (PersonInfo.course) PersonSeek.course = PersonInfo.course

            await PersonSeek.save()
            return response.status(201).send()
        }

    }

    async delete({ params, response }) {

        const { id } = params
        const PersonToDelete = await Person.find(id)

        if (!PersonToDelete) {
            return response.status(404).send()
        }
        else {
            await PersonToDelete.delete()
            return response.status(200).send()
        }
    }
}

module.exports = PersonController
