const codes = require('../../config/constants/responseCodes')

class APIResponse {
    constructor(data) {
        this.code = codes.SUCCESS
        this.msg = 'Success'
        this.data = data
    }

    toJSON() {
        const { code, msg } = this
        return {
            ...{ code, msg },
            ...this.data
        }
    }
}

module.exports = APIResponse
