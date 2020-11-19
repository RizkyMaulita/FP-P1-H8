const {User, Transaction, TravelPackage} = require('../models')

class AdminController{
  static home(req, res){
    res.render('admin/home.ejs')
  }
  static showTravelData(req, res){
    TravelPackage.findAll()
      .then(data => res.render('admin/travelPackage.ejs', {data}))
      .catch(err => res.send(err))
  }
  static showFormAddTravel(req, res){
    res.render('admin/addTravel.ejs')
  }
  static addTravel(req,res){
    let newData = {
      title: req.body.title,
      about: req.body.about,
      location: req.body.location,
      meet_point: req.body.meet_point,
      departure_date: req.body.departure_date,
      duration: req.body.duration,
      type: req.body.type,
      price: req.body.price
    }
    TravelPackage.create(newData)
      .then(data => res.redirect('/admins'))
      .catch(err => res.send(err))
  }
  static showFormEditTravel(req, res){
    let id = +req.params.id
    TravelPackage.findByPk(id)
      .then(data =>{
        if(data) res.render('admin/editForm.ejs', {data})
      })
      .catch(err => res.send(err))
  }
  static editTravel(req, res){
    let id = +req.params.id
    let newData = {
      title: req.body.title,
      about: req.body.about,
      location: req.body.location,
      meet_point: req.body.meet_point,
      departure_date: req.body.departure_date,
      duration: req.body.duration,
      type: req.body.type,
      price: req.body.price
    }
    TravelPackage.update(newData, {
      where: {id: id}
    })
      .then(data => res.redirect('/admins/travels'))
      .catch(err => res.send(err))
  }
  static deleteData(req, res){
    let id = +req.params.id
    TravelPackage.destroy({
      where: {id: id}
    })
      .then(data => res.redirect('/admins/travels'))
      .catch(err => res.send(err))
  }
  static showUserData(req, res){
    User.findAll({
      where:{role_admin: false}
    })
      .then(data =>{
        if(data) res.render('admin/dataUser.ejs', {data})
      })
      .catch(err => res.send(err))
  }
  static showTransactionData(req, res){
    Transaction.findAll({
      include:[User, TravelPackage]
    })
      .then(data =>{
        if(data) res.render('admin/dataTransaction.ejs', {data})
      })
      .catch(err => res.send(err))
  }
}

module.exports = AdminController