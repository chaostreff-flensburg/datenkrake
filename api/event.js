var router = require('express').Router()
var Datastore = require('nedb')
var nodemailer = require('nodemailer')

var mail = require(__dirname + '/../mail.config.json')
var config = require(__dirname + '/../config.json')
var db = new Datastore({ filename: __dirname + '/../db/event', autoload: true })

let transporter = nodemailer.createTransport(mail);

router.post('/event/signup', function (req, res, next) {
  res.json(req.body);
})

router.post('/event/submit', function (req, res, next) {
  console.log(req.body);
  var user = req.body
  user.confirmed = false
  db.insert(user, function(err, newUser) {
    console.log(newUser);
    signupMail(newUser._id, newUser.mail)
  })
})

function signupMail(userId, userMail) {
  var message = {
    from: mail.auth.user,
    to: userMail,
    subject: 'Confirm your signup for ' + config.event.name,
    text: 'Click here to confirm your signup: ' + config.host + '/api/event/confirm/' + userId
  };
  transporter.sendMail(message)
}

module.exports = router
