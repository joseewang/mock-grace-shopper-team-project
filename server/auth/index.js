const router = require('express').Router()
const { models: { User, Sale, Product } } = require('../db')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err)
  }
})


router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.send({ token: await user.generateToken() })
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.get('/me', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization)
    const cart = await Sale.findOne({
      where: {
        userId: user.id,
        isPurchased: false
      },
      include: [{ model: Product }],
      attributes: ['id', 'userId']
    })

    res.send({ user, cart })
  } catch (ex) {
    next(ex)
  }
})