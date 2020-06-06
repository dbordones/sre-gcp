'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use('Route')

Route.group(() => {

  Route
    .get('/', 'PersonController.list')
    .middleware(['UserAuth'])
  
  Route
    .get('/:rut', 'PersonController.seek')
    .middleware(['UserAuth'])
  
  Route
    .post('/', 'PersonController.create')
    .middleware(['UserAuth'])
    .validator('CreatePerson')
  
  Route
    .put('/:id','PersonController.update')
    .middleware(['UserAuth'])
    .validator('UpdatePerson')
  
  Route
    .delete('/:id', 'PersonController.delete')
    .middleware(['UserAuth'])

}).prefix('people/')

Route.any('*', async ({ response }) => {
  return response.status(404).send()
})