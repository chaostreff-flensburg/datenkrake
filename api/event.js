var router = require('express').Router()
var fs = require('fs')
var path = require('path')

var marked = require('marked')
var Datastore = require('nedb')
var nodemailer = require('nodemailer')

const contentFolder = path.resolve(__dirname + '/../content/')

var mail = require(__dirname + '/../mail.config.json')
var config = require(__dirname + '/../config.json')
var db = new Datastore({ filename: __dirname + '/../db/event', autoload: true, timestampData: true })

let transporter = nodemailer.createTransport(mail)


// routes

router.post('/event/signup', function (req, res, next) {
  var user = req.body
  user.confirmed = false
  user.reminded = false
  db.insert(user, function(err, newUser) {
    signupMail(newUser._id, newUser.email, newUser.name)
    res.redirect('/submitted')
  })
})

// router.get('/event/confirm/:id', function(req, res, next) {
//   db.update({_id: req.params.id}, {$set: {confirmed: true}}, {returnUpdatedDocs: true}, function(err, numAffected, affectedDocuments, upsert) {
//     var user = affectedDocuments
//     confirmationMail(user._id, user.email, user.name)
//     res.redirect('/confirmed')
//   })
// })

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

router.get('/event/content/:slug', function (req, res, next) {
  fs.readFile(__dirname + '/../content/' + req.params.slug + '.md', 'utf8', (err, data) => {
    if (err) res.sendStatus(404)
    else {
      var article = {
        content: marked(data)
      }
      res.json(article)
    }
  })
})

router.get('/event/content', function (req, res, next) {
  fs.readdir(__dirname + '/../content/', (err, files) => {
    if (err) res.sendStatus(404)
    for (var i = 0; i < files.length; i++) {
      files[i] = files[i].slice(0, -3);
    }
    res.json(files)
  })
})


// waitinglist

setInterval(function() {
  db.find({confirmed:false}, function(err, docs) {
    for (var i = 0; i < docs.length; i++) {
      if ( docs[i].createdAt < (Date.now() - 1000*60*60*24*10) ) {
        sendMail(
          docs[i].email,
          docs[i].name,
          'Entfernung von der Warteliste',
          `Moin ${docs[i].name},
          leider hast du dein Ticket nicht schnell genug bezahlt. Um allen eine faire Chance auf einen Platz zu bieten, haben wir dich von der Warteliste entfernt. Du kannst dich aber erneut versuchen anzumelden.
          Wenn du glaubst das uns ein Fehler unterlaufen ist, schreibe uns eine kurze Mail.

          Nordische Grüße,

          Chaostreff Flensburg e.V.`
        )
        db.remove({_id: docs[i]._id})
      }
      else if ( (docs[i].createdAt < (Date.now() - 1000*60*60*24*5)) && !docs[i].reminded ) {
        sendMail(
          docs[i].email,
          docs[i].name,
          'Vergiss nicht dein Ticket zu bezahlen!',
          `Moin ${docs[i].name},
          bitte vergesse nicht dein Ticket zu bezahlen.`
        )
        db.update({_id: docs[i]._id}, {$set: {reminded: true}})
      }
    }
  })
}, 1000*60*60)


// helper functions

function signupMail(userId, userMail, userName) {
  var message = {
    from: mail.auth.user,
    to: userMail,
    subject: 'Bestätige deine Teilnahme am ' + config.event.name,
    text: `Hallo ${userName}!
    Wenn du Fragen hast oder deine Teilnahme absagen möchtest, antworte einfach auf diese Mail.

    Nordische Grüße,

    Chaostreff Flensburg e.V.`
  };
  transporter.sendMail(message)
  console.log('Signup mail sent!', userMail);
}

// function confirmationMail(userId, userMail, userName) {
//   var message = {
//     from: mail.auth.user,
//     to: userMail,
//     subject: 'Bestätige deine Teilnahme am ' + config.event.name,
//     text: 'Hey ' + userName + '! Danke das du deine Teilnahme bestätigt hast. Wir sehen uns auf dem ' + config.event.name + '! Nordische Grüße, dein Chaostreff Flensburg e.V.'
//   };
//   transporter.sendMail(message)
//   console.log('Confirmation mail sent!', userMail);
// }

function sendMail(email, name, subject, text) {
  var message = {
    from: mail.auth.user,
    to: email,
    subject: config.event.name + ': ' + subject,
    text: text
  };
  transporter.sendMail(message)
  console.log('Mail sent!', email, subject);
}


module.exports = router
