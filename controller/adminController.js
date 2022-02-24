const Admin = require('../models/Admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const newAdmin = async(req,res) => {
    const {username , password} = req.body
    const salt = await bcrypt.genSalt()
    try{
      bcrypt.hash(password , salt, (err, hash) => {
        Admin.create({
          username,
          password: hash
        })
      })
    }catch{
      res.send('ERROR CREATING ADMIN')
    }
  }

const loginAdmin = async(req,res) =>{
    const {username, password} = req.body
    try{
      const user = await Admin.findOne({username})
      const auth = await bcrypt.compare(password , user.password)
      console.log(username, password)
      if(auth){
        const accessToken = jwt.sign({user} , 'secret')
        res.json({accessToken})
    
      }
    }
    catch(err){
      res.send('error logging in')
    }

  
  }


module.exports = {
    newAdmin,
    loginAdmin
}