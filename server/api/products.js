const router = require('express').Router();
const { models: { User, Product, Sale, SaleItem }} = require('../db');
module.exports = router;

//GET api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

//GET api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
   const product = await Product.findByPk(req.params.id);
   res.json(product); 
  } catch (error) {
    next(error);
  }
});

//PUT /api/products/:productId/users/:userId
router.put('/:productId/users/:userId', async (req, res, next) => {
  try {
    //get user by userId & get product by productId
    const user = await User.findByPk(req.params.userId);
    const product = await Product.findByPk(req.params.productId);

    //get false isPurchased order (aka current cart items)
    let currCart = await Sale.findOne({
      where: {
        userId: user.id,
        isPurchased: false,
      },
      include: [
        { model: Product },
      ]
    })

    //if no false isPurchased order exists--create new order
    if(!currCart) {
      //step 1: create the order
      await Sale.create({ isPurchased: false, userId: user.id })

      //step 2: retrieve the order
      currCart = await Sale.findOne({
        where: {
          userId: user.id,
          isPurchased: false,
        },
      })

      //step 3: add "clicked" product to new order
      await currCart.addProduct(product)
    } else  //if false isPurchased order exists--retrieve order
    {
      //step 1: retrieve all products in order
      const cartItemIds = currCart.products.map(product => product.id)

      //step2: check if "clicked" product is in the order
      if (currCart.products && cartItemIds.includes(product.id)) {
        const currSaleItem = await SaleItem.findOne({
          where: {
            saleId: currCart.id,
            productId: product.id
          }
        })

        //increment orderQty if "clicked" product exists
        await currSaleItem.update({ quantity: currSaleItem.quantity + 1 })
      } else //add "clicked" product to order if it doesn't exist in this order
      {
        await currCart.addProduct(product)
      };
    };
  } catch(error) {
    next(error);
  };
});