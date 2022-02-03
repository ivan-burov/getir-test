const httpStatus = require('http-status')

const codes = require('./responseCodes')

module.exports = {
    [codes.NOT_FOUND]: httpStatus.NOT_FOUND,
    [codes.BAD_REQUEST]: httpStatus.BAD_REQUEST,
    [codes.ERROR]: httpStatus.INTERNAL_SERVER_ERROR
}
