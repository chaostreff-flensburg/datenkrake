var router = require('express').Router()
var fs = require('fs')
var path = require('path')

var marked = require('marked')
var Datastore = require('nedb')
var nodemailer = require('nodemailer')
var hashbow = require('hashbow')

const contentFolder = path.resolve(__dirname + '/../content/')

var mail = require(__dirname + '/../mail.config.json')
var config = require(__dirname + '/../config.json')
var db = new Datastore({ filename: __dirname + '/../db/event', autoload: true, timestampData: true })

let transporter = nodemailer.createTransport(mail)


// routes

router.post('/event/signup', async function (req, res, next) {
  var user = req.body
  user.confirmed = false
  user.reminded = false
  user.color = await hashbow(user.name+user.email)
  user.color = user.color.substr(1, user.color.length)
  db.insert(user, function(err, newUser) {
    signupMail(newUser._id, newUser.email, newUser.name, user.color)
    res.redirect('/submitted')
  })
})

router.get('/event/confirm/:id', function(req, res, next) {
  db.update({_id: req.params.id}, {$set: {confirmed: true}}, {returnUpdatedDocs: true}, function(err, numAffected, affectedDocuments, upsert) {
    var user = affectedDocuments
    confirmationMail(user._id, user.email, user.name)
    res.redirect('/admin')
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
          bitte vergesse nicht dein Ticket zu bezahlen.

          Nordische Grüße,

          Chaostreff Flensburg e.V.`
        )
        db.update({_id: docs[i]._id}, {$set: {reminded: true}})
      }
    }
  })
}, 1000*60*60)


// helper functions

function signupMail(userId, userMail, userName, code) {
  var message = {
    from: mail.auth.user,
    to: userMail,
    subject: 'Deine Teilnahme am ' + config.event.name,
    text: `Moin ${userName}!
    Um deine Anmeldung zu bestätigen bitten wir dich den Betrag von 20€ an den Chaostreff Flensburg zu senden.
    Das Geld kannst du uns entweder überweisen oder via Paypal zukommen lassen.

    Name: Chaostreff Flensburg e. V.
    IBAN: DE48 2175 0000 0165 0052 81
    BIC: NOLADE21NOS (Nord-Ostsee Sparkasse)
    Verwendungszweck: weekendHACK ${code}

    oder:

    paypal.me/chaosfl/20
    Verwendungszweck: weekendHACK ${code}

    Bitte verwende folgenden Code ${code} in deinem Verwendungszweck damit wir deine Zahlung zuordnen können.

    Bitte Sende uns den Betrag innerhalb von 10 Tagen zu. Wenn bis dahin kein Geld eingegangen ist wird dein Platz wieder freigegeben da wir nur begrenzt Platz haben.

    PS: Falls dir 20€ zu viel sind oder du nur einen Tag kommen möchtest antworte uns einfach auf diese Mail und wir werden eine Lösung finden.
    Mit freundlichen Grüße dein
    Chaostreff Flensburg e.V.`
  };
  transporter.sendMail(message)
  console.log('Signup mail sent!', userMail);
}

function confirmationMail(userId, userMail, userName) {
  var message = {
    from: mail.auth.user,
    to: userMail,
    subject: 'Deine Teilnahme am ' + config.event.name,
    text: 'Hey ' + userName + `!
    Wir bestätigen deine Teilnahme an der WeekendHack. Du bist jetzt angemeldet und Bestätigt. Solltest du nicht  kommen können, schreibe uns bitte eine kurze Mail.

    Hier noch einmal alle wichtigen Daten.

    weekendHACK
    Technologiezentrum, Liese-Meitner-Str. 2, 24941 Flensburg
    Freitag: 30.06.2017 ab 18:00 Uhr bis Sonntag, 02.07.2017

    Denke an deinen Laptop, Verteilersteckdose, Lankabel.

    Wir sehen uns auf dem weekendHack!
    Nordische Grüße, dein Chaostreff Flensburg e.V.`
  };
  transporter.sendMail(message)
  console.log('Confirmation mail sent!', userMail);
}

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
