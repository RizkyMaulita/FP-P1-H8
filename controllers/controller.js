const {TravelPackage, User, Transaction} = require('../models')
const Helper = require('../helper/helper')

class Controller{
  static home(req, res){
    res.render('home.ejs')
  }
  static showFormRegister(req, res){
    res.render('register.ejs')
  }
  static register(req, res){
    let newData = {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }
    console.log(newData);
    User.create(newData, {
      returning: true
    })
      .then(data =>{
        User.sendingEmail(newData.email)
        res.redirect('/login')
      })
      .catch(err => res.send(err))
  }
  static showFormLogin(req, res){
    res.render('login.ejs')
  }
  static login(req, res){
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    User.findOne({
      where:{
        username: username,
        email: email
      }
    })
      .then(data =>{
        if(data && Helper.comparePassword(data.password, password)){
          req.session.userId = data.id
          if(data.role_admin) res.redirect('/admins')
          else res.redirect('/')
        }
        else res.send(`invalid username or password`)     // ini belum selesai 
      })
      .catch(err => res.send(err))
  }
  static showCategories(req, res){
    TravelPackage.findAll()
      .then(data => res.render('categories.ejs', {data}))
      .catch(err => res.sedn(err))
  }
  static showDetails(req, res){
    let id = +req.params.id
    TravelPackage.findByPk(id)
      .then(data => res.render('details.ejs', {data}))
      .catch(err => res.send(err))
  }
  static showFormTransactions(req, res){
    let id = +req.params.id
    let userId = req.session.userId
    let arrPromises = [User.findByPk(userId), TravelPackage.findByPk(id)]
    Promise.all(arrPromises)
      .then(data => res.render('transactions.ejs', {dataUser: data[0], dataTravel: data[1]}))
      .catch(err => res.send(err))
  }
  static transactions(req, res){
    let id = +req.params.id
    let totalPerson = +req.body.totalPerson
    TravelPackage.findByPk(id)
      .then(data =>{
        let newData = {
          UserId: +req.session.userId,
          TravelPackageId: id,
          transaction_total: data.price * totalPerson,
          total_person: totalPerson
        }
        let arrPromises = [
          Transaction.create(newData), 
          Transaction.findOne({
            where:{
              UserId: +req.session.userId,
              TravelPackageId: id
            },
            include: [User, TravelPackage]
          })
        ]
        return Promise.all(arrPromises)
      })
      .then(data => res.render('checkout.ejs', {data: data[1], Helper}))
      .catch(err => res.send(err))
  }
  static logout(req, res){
    req.session.destroy((err)=>{
      if(err) res.render('error.ejs', {errors: err})
      else res.redirect('/')
    })
  }
}

module.exports = Controller