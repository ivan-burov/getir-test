const request = require('supertest')
const assert = require('assert')
const sinon = require('sinon')

const codes = require('../../config/constants/responseCodes')
const mongodb = require('../../config/libs/mongo')
const app = require('../../config/libs/express')

describe('Records', function() {

    describe('list', function() {

        const record = {
            key: 'TAKwGc6Jr4i8Z487',
            createdAt: '2017-01-28T01:22:14.398Z',
            totalCount: 7
        }

        before(async function() {
            sinon.replace(mongodb, 'collection', () => ({
                aggregate() {
                    return {
                        toArray() {
                            return [record]
                        }
                    }
                }
            }))
        })

        after(function() {
            sinon.restore()
        })

        it('should return records', async function() {
            const { body } = await request(app)
                .post('/records')
                .send({
                    startDate: '2017-01-28',
                    endDate: '2017-01-29',
                    minCount: 7,
                    maxCount: 7
                })
                .expect(200)

            assert.deepStrictEqual(body, {
                    code: codes.SUCCESS,
                    msg: 'Success',
                    records: [record]
                }
            )
        })

    })

})
