const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },

  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
  imageURL: {
    type: Sequelize.TEXT,
    defaultValue: 'https://us.123rf.com/450wm/irwanjos/irwanjos1807/irwanjos180700001/104461045-cute-grasshopper-cartoon-isolated-on-white-background.jpg?ver=6'

  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    }
  },
  category: {
    type: Sequelize.STRING
    //theoretically could be ENUM but we don't know what our categories are yet
    //would make it easier to filter later if we only have x possible options though
  }


})

module.exports = Product;
