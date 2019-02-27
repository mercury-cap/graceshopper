const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('orders', {
  total: {
    type: Sequelize.DECIMAL(10, 2)
  },
  status: {
    type: Sequelize.STRING
  }
})

module.exports = Orders
