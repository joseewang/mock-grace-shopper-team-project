const router = require('express').Router();
const {
  models: { User, Product, SaleItem, Sale },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const cart = await Sale.findOne({
      where: {
        userId: user.id,
        isPurchased: false,
      },
      include: [{ model: Product }],
      attributes: ['id', 'userId'],
      //why filter by attributes ? this is a get route so no risk of injection right?
    });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const oldCart = await Sale.findOne({
      where: {
        userId: user.id,
        isPurchased: false,
      },
      include: [{ model: Product }],
      attributes: ['id', 'userId'],
    });

    await oldCart.setProducts(req.body.map(product => product.id));
    const newCart = await Sale.findByPk(oldCart.id, {
      include: [{ model: Product }],
      attributes: ['id', 'userId'],
    })

    res.send(newCart);
  } catch (err) {
    next(err);
  }
});