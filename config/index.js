const { SERVER_PORT, MONGO_URL, NODE_ENV } = process.env

module.exports = {
    env: NODE_ENV,
    server: {
        port: SERVER_PORT
    },
    db: {
        url: MONGO_URL
    }
}
