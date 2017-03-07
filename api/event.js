var router = require('express').Router()
var Datastore = require('nedb')
var nodemailer = require('nodemailer')

var mail = require(__dirname + '/../mail.config.json')
var config = require(__dirname + '/../config.json')
var db = new Datastore({ filename: __dirname + '/../db/event', autoload: true, timestampData: true })

let transporter = nodemailer.createTransport(mail);


// routes

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

router.get('/event/users/confirmed', function(req, res, next) {
  db.find({confirmed:true}, function(err, docs) {
    res.send(docs)
  })
})

router.get('/event/users/unconfirmed', function(req, res, next) {
  db.find({confirmed:false}, function(err, docs) {
    res.send(docs)
  })
})


// helper functions

function signupMail(userId, userMail, userName) {
  var message = {
    from: mail.auth.user,
    to: userMail,
    subject: 'Bestätige deine Teilnahme am ' + config.event.name,
    text: 'Hallo ' + userName + '! Bitte klicke hier um deine Teilnahme zu bestätigen: https://' + config.host + '/api/event/confirm/' + userId + ' Wenn du Fragen hast oder deine Teilnahme absagen möchtest, antworte einfach auf diese Mail. Nordische Grüße, dein Chaostreff Flensburg e.V.'
  };
  transporter.sendMail(message)
  console.log('Signup mail sent!');
}

function confirmationMail(userId, userMail, userName) {
  var message = {
    from: mail.auth.user,
    to: userMail,
    subject: 'Bestätige deine Teilnahme am ' + config.event.name,
    text: 'Hey ' + userName + '! Danke das du deine Teilnahme bestätigt hast. Wir sehen uns auf dem ' + config.event.name + '! Nordische Grüße, dein Chaostreff Flensburg e.V.'
  };
  transporter.sendMail(message)
  console.log('Confirmation mail sent!');
}


module.exports = router
