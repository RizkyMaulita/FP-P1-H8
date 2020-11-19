const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')

class Helper{
  static hashPassword(plainPassword){
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(plainPassword, salt)
    return hash
  }
  static comparePassword(hashPassword, plainPassword){
    return bcrypt.compareSync(plainPassword, hashPassword)
  }
  static formatPrice(price){
    let reverse = price.toString().split('').reverse().join('')
    let ribuan = reverse.match(/\d{1,3}/g)
    return ribuan.join('.').split('').reverse().join('')
  }
  // static sendingEmail(email){
  //   let transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     auth:{
  //       user: 'hacktivtravel@gmail.com',
  //       pass: 'Phase1H8'
  //     }
  //   })
  //   let mailOptions = {
  //     from: 'hacktivtravel@gmail.com',
  //     to: email,
  //     subject: 'Welcome To HacktivTravel !!!',
  //     text: `Hello ! Thank You for your first regist in HacktivTravel ! Let's Trip Together`
  //   }

  //   transporter.sendMail(mailOptions, (err, data)=>{
  //     if(err) return false
  //     else return true
  //   })
  // }
}

module.exports = Helper