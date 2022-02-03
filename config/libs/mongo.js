const { MongoClient } = require('mongodb')

const { db: { url } } = require('../index')

let client = null

function connect() {
    client = new MongoClient(url)
    return client.connect()
}

function collection(name) {
    return client.db().collection(name)
}

module.exports = { connect, collection }
