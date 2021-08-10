const router = require('express').Router()
const { models: { User, Sale, Product } } = require('../db');
const { requireToken } = require('../api/gatekeepingMiddleware');
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err)
  }
})

// POST /auth/signup
router.post('/signup', async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await User.create({ username, password })
    res.send({ token: await user.generateToken() })
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

// GET /auth/me
router.get('/me', requireToken, async (req, res, next) => {
  try {
    const user = req.user;
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
