//this is the access point for all things database related!

const db = require('./db')
const Product = require('./models/Product')
const User = require('./models/User')
const SaleItem = require('./models/SaleItem')
const Sale = require('./models/Sale')

//associations could go here!
User.hasMany(Sale);
Sale.belongsTo(User);

Product.belongsToMany(Sale, { through: "saleItem" });
Sale.belongsToMany(Product, { through: "saleItem" });


module.exports = {
  db,
  models: {
    User,
    Product,
    SaleItem,
    Sale,
  },
}
