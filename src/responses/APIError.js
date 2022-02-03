const httpStatus = require('http-status')

const codes = require('../../config/constants/responseCodes')
const statuses = require('../../config/constants/respponseStatuses')

class APIError extends Error {
    constructor(message, code = codes.ERROR) {
        super(message)

        this.name = this.constructor.name
        this.code = code
        this.msg = message
        this.status = statuses[code] || httpStatus.INTERNAL_SERVER_ERROR

        Error.captureStackTrace(this, this.constructor.name)
    }

    toJSON() {
        return {
            code: this.code,
            msg: this.msg
        }
    }
}

module.exports = APIError
