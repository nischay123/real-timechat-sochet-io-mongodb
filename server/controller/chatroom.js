const mongoose = require('mongoose')
const chatroom = require('../models/chatroom')



const getMessage = () => {
    chatroom.find()
    .select("_id name")
    .exec()
    .then(users => {
        const count = users.length
  
        console.log("user ",users)
        return users
    })
    .catch(err => {
         
        return err;
    })
}



module.exports = {
    getMessage
}