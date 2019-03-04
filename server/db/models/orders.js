const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('orders', {
  total: {
    type: Sequelize.INTEGER
  },
  status: {
    type: Sequelize.STRING
  },
  sessionId: {
    type: Sequelize.STRING
  }
})

module.exports = Orders
