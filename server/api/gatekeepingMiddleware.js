const { models: { User } } = require("../db")

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const user = await User.findByToken(token);
    req.user = { id: user.id, username: user.username, isAdmin: user.isAdmin }
    next()
  } catch (error) {
    next(error)
  }
}

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send("You are not authorized to view this information.")
  } else {
    next()
  }
}

module.exports = {
  requireToken,
  isAdmin
}
