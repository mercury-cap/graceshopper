const User = require('./user')
const Products = require('./products')
const Orders = require('./orders')
const db = require('../db')
const Sequelize = require('sequelize')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

const OrderItems = db.define('order_items', {
  quantity: Sequelize.INTEGER,
  price: Sequelize.INTEGER
})

Orders.belongsTo(User)
User.hasMany(Orders)

Orders.belongsToMany(Products, {through: OrderItems})
Products.belongsToMany(Orders, {through: OrderItems})

module.exports = {
  User,
  Products,
  Orders,
  OrderItems
}
