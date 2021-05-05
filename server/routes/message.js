  
const express = require('express')
const router = express.Router()

const {getLastMsg} = require('../controller/message')

router.get('/message/:room/:skip', getLastMsg)


module.exports = router
