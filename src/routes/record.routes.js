const { Router } = require('express')
const { validate } = require('express-validation')

const { list }  =require('../controllers/records.controller')
const validation = require('../validation/records.validation')

const router = new Router()

router.use('/', validate(validation.getRecords, { context: true }), list)

module.exports = router
