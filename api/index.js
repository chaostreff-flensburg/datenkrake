var router = require('express').Router()

// Add USERS Routes
router.use(require('./users'))
router.use(require('./event'))

module.exports = router
