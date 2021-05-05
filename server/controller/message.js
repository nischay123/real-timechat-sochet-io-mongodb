const mongoose = require('mongoose')
const Message = require('../models/message')
const Chat = require('../models/chatroom');


const getMessage = () => {
    Message.find()
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


const addMessage =(data)=>{
      mongoose.save({
         text: data.text  ,
         user : data.user,
         chatroom: data.chatroom
      } )
      .then( (message) =>{
           console.log()
      } )
}


const getLastMsg =(req,res)=>{
        // res.json({msg : "working"});
    const room =  req.params.room ; 
    const skp= parseInt(req.params.skip);
    console.log(typeof(room),skp);
    console.log(Chat);
    Chat.findOne({name:room})
        .then(chatrm =>{
            console.log(chatrm._id);
            // res.status(200).json(chatrm);
            Message.find({chatroom: chatrm._id})
            .skip(skp)
            .limit(5)
            .populate('user')
            .sort({time : -1})
            .then((prevMessage) => res.status(200).json(prevMessage))
            .catch( err => {
                console.log("err line"); 
                res.json(400).json(err) });
        }) 
        .catch( err => {
            console.log("bahar error");
            res.json(400).json(err)
        });
    
}

module.exports = {
    getLastMsg,
    addMessage,
    getMessage
}