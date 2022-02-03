'use strict'

require('dotenv').config()
const debug = require('debug')('server')
const app = require('./config/libs/express')
const { server: { port } } = require('./config')
const { connect } = require('./config/libs/mongo')

connect()
    .then(() => {
        debug(`db connected`)
        app.listen(port, function() {
            debug(`running on ${port}`)
        })
    }, console.log)
