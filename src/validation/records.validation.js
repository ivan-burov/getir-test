const { Joi } = require('express-validation')

module.exports = {
    getRecords: {
        body: Joi.object({
            startDate: Joi.date().required(),
            endDate: Joi.date().required(),
            minCount: Joi.number().positive().required(),
            maxCount: Joi.number().positive().required()
        })
    }
}
