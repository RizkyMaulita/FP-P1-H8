const adminRoute = require('express').Router()
const AdminController = require('../controllers/adminController')

adminRoute.get('/', AdminController.home)
adminRoute.get('/travels', AdminController.showTravelData)
adminRoute.get('/travels/add', AdminController.showFormAddTravel)
adminRoute.post('/travels/add', AdminController.addTravel)
adminRoute.get('/travels/edit/:id', AdminController.showFormEditTravel)
adminRoute.post('/travels/edit/:id', AdminController.editTravel)
adminRoute.get('/travels/delete/:id', AdminController.deleteData)
adminRoute.get('/users', AdminController.showUserData)
adminRoute.get('/transactions', AdminController.showTransactionData)

module.exports = adminRoute