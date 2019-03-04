/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const bobsEmail = 'bobby@email.com'

    beforeEach(() => {
      return User.create({
        name: 'Bob',
        email: 'bobby@email.com',
        password: '123',
        shippingAddress: '23 Spicey Court',
        shippingCity: 'Orlando',
        shippingState: 'Florida',
        shippingZip: '11211',
        billingAddress: '1 Hot Sauce Way',
        billingState: 'New York',
        billingCity: 'New York',
        billingZip: '32789'
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(302)

      // expect(res.body).to.be.an('array')
      // expect(res.body[0].email).to.be.equal(bobsEmail)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
