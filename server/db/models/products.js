const Sequelize = require('sequelize')
const db = require('../db')

const Products = db.define('products', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  },
  Scoville: {
    type: Sequelize.BIGINT,
    allowNull: false,
    validate: {
      min: 0,
      max: 3200000
    }
  }
})

module.exports = Products
