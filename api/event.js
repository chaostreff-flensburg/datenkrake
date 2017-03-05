var router = require('express').Router()
var Datastore = require('nedb')
var nodemailer = require('nodemailer')

var mail = require(__dirname + '/../mail.config.json')
var config = require(__dirname + '/../config.json')
var db = new Datastore({ filename: __dirname + '/../db/event', autoload: true, timestampData: true })

let transporter = nodemailer.createTransport(mail);


router.post('/event/signup', function (req, res, next) {
  var user = req.body
  user.confirmed = false
  db.insert(user, function(err, newUser) {
    signupMail(newUser._id, newUser.mail, newUser.name)
    res.status(200).end()
  })
})

router.get('/event/confirm/:id', function(req, res, next) {
  db.update({_id: req.params.id}, {$set: {confirmed: true}}, {returnUpdatedDocs: true}, function(err, numAffected, affectedDocuments, upsert) {
    var user = affectedDocuments
    confirmationMail(user._id, user.mail, user.name)
    res.redirect('/confirmed')
  })
})


function signupMail(userId, userMail, userName) {
  var message = {
    from: mail.auth.user,
    to: userMail,
    subject: 'Confirm your signup for ' + config.event.name,
    text: 'Hey ' + userName + '! Click here to confirm your signup: http://' + config.host + '/api/event/confirm/' + userId
  };
  transporter.sendMail(message)
  console.log('Signup mail sent!');
}

function confirmationMail(userId, userMail, userName) {
  var message = {
    from: mail.auth.user,
    to: userMail,
    subject: 'Confirm your signup for ' + config.event.name,
    text: 'Hey ' + userName + '! You are now registered for ' + config.event.name + '!'
  };
  transporter.sendMail(message)
  console.log('Confirmation mail sent!');
}


module.exports = router
