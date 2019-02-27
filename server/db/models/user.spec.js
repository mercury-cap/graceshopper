/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
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

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('123')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
