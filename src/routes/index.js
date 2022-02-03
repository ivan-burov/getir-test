const { Router } = require('express')

const records = require('./record.routes')

const router = new Router()

router.use('/records', records)

module.exports = router
