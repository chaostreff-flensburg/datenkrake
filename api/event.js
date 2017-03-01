var router = require('express').Router()



router.post('/event/signup', function (req, res, next) {
  res.json(req.body);
})

module.exports = router
