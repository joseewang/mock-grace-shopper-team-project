const Sequelize = require('sequelize')
const db = require('../db')

const SaleItem = db.define('saleItem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
})

module.exports = SaleItem;
