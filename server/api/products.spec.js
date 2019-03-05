const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const seed = require('../../script/seed')

describe('Product routes', () => {
  before(async () => {
    await db.sync({force: true})
    await seed()
  })

  describe('/api/products/', () => {
    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body).length.to.be.greaterThan(0)
    })

    it('GET /api/products/:productId', async () => {
      const res = await request(app)
        .get('/api/products/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('Sriracha Sauce')
    })
  })
})
