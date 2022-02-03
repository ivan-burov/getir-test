const moment = require('moment')
const debug = require('debug')('api:records')

const codes = require('../../config/constants/responseCodes')

const db = require('../../config/libs/mongo')

const APIResponse = require('../responses/APIResponse')
const APIError = require('../responses/APIError')

async function list(req, res) {
    const log = debug.extend('list')
    const { startDate, endDate, minCount, maxCount } = req.body

    log('filter: %o', req.body)

    const start = moment(startDate).startOf('day')
    const end = moment(endDate).endOf('day')

    if (start.isAfter(end) || maxCount < minCount) {
        throw new APIError('Invalid data', codes.BAD_REQUEST)
    }

    const records = await db.collection('records').aggregate([
        {
            $match: {
                $and: [
                    { createdAt: { $gte: start.toDate() } },
                    { createdAt: { $lte: end.toDate() } },
                ]
            }
        },
        {
            $project: {
                _id: 0,
                key: 1,
                createdAt: 1,
                totalCount: { $sum: '$counts' }
            }
        },
        {
            $match: {
                $and: [
                    { totalCount: { $gte: minCount } },
                    { totalCount: { $lte: maxCount } },
                ]
            }
        }
    ]).toArray()

    log('records found: %d', records.length)

    res.json(new APIResponse({ records }))
}

module.exports = { list }
