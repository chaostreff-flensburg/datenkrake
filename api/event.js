var router = require('express').Router()

/* GET user by ID. */
router.get('/event/signup', function (req, res, next) {
  res.json(req.body);
})

module.exports = router
