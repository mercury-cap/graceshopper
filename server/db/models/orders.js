const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('orders', {
  // : {
  //   type: Sequelize.STRING,
  //   allowNull: false
  // },
  // description: {
  //   type: Sequelize.STRING,
  //   allowNull: false
  // },
  // country: {
  //   type: Sequelize.STRING,
  //   allowNull: false
  // },
  // type: {
  //   type: Sequelize.STRING,
  //   allowNull: false
  // },
  // scoville: {
  //   type: Sequelize.BIGINT,
  //   allowNull: false,
  //   validate: {
  //     min: 0,
  //     max: 3200000
  //   }
  // }
})

module.exports = Orders
