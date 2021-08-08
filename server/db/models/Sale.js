const Sequelize = require('sequelize')
const db = require('../db')

const Sale = db.define('sale', {
  isPurchased: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  }
})

module.exports = Sale;
