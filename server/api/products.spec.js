const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
// const Products = db.model('products')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
    })
  })
})
