const express = require('express')
const bodyParser = require('body-parser')
const mongo = require('mongodb')
const argon2 = require('argon2')
const session = require('express-session')
const multer = require('multer')

require('dotenv').config()

let db = null

// Create a new URL based on the .env credentials
const url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT

// Make connection to the database
mongo.MongoClient.connect(url, function(err, client) {
  if (err) throw err
  db = client.db(process.env.DB_NAME)
})

// Adds the uploaded picture to the specific folder
const upload = multer({
  dest: 'static/upload/'
})

// Starts express, uses ejs files
const app = express()
  .set('view engine', 'ejs')
  .set('views', 'src/view')
  .use(express.static('static'))
  .use(
    bodyParser.urlencoded({
      extended: true
    })
  )
  .use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET
    })
  )

app
  .use('/images', express.static('src/images'))

  // Starts function
  .get('/', home)
  .get('/profile/:id', singleProfile)
  .get('/signup', signup)
  .post('/signup', upload.single('cover'), doSignup)
  .post('/doLogin', doLogin)
  .get('/dashboard', dashboard)
  .get('/logout', logout)
  .get('/myprofile', myprofile)
  //  .delete('/:id', remove)
  .get('*', notFound)
  .listen(5000)

function dashboard(req, res) {
  const data = {
    session: req.session.user,
    users: ''
  }

  if (data.session) {
    console.log('ingelogd')
    db.collection('users')
      .find()
      .toArray(done)

    function done(err, allUsers) {
      if (err) {
      } else {
        console.log(data)
        data.users = allUsers

        res.render('dashboard/dashboard.ejs', data)
      }
    }
  } else {
    console.log('niet ingelogd')
    res.render('dashboard/dashboard.ejs', data)
  }
}

function home(req, res) {
  const data = {
    session: req.session.user
  }

  res.render('index.ejs', data)
}

function doLogin(req, res) {
  const username = req.body.username
  const password = req.body.password

  if (!username || !password) {
    res.status(400).send('Username or password are missing')

    return
  }
  const dbUsers = db.collection('users')

  dbUsers.findOne(
    {
      email: username
    },
    function(err, user) {
      if (err) {
        console.log(err)
      } else {
        try {
          argon2.verify(user.password, password).then(onverify)
        } catch (err) {
          res.redirect('index.ejs')
          console.log(err)
        }

        function onverify(match) {
          // Argon2 match with password
          if (match) {
            // Logged in
            req.session.user = user

            const data = {
              session: req.session.user,
              users: ''
            }

            res.redirect('dashboard')
          } else {
            res.status(401).send('Password incorrect')
          }
        }
      }
    }
  )
}

function signup(req, res) {
  const data = {
    session: req.session.user
  }

  res.render('front/signup.ejs', data)
}

function doSignup(req, res) {
  const currentUser = req.body.email
  const password = req.body.password
  const passwordAgain = req.body.passwordAgain
  const min = 2
  const max = 16

  if (!currentUser || !password) {
    res.status(400).send('Username or password are missing')
    return
  }

  if (password.length < min || password.length > max) {
    res
      .status(400)
      .send('Password must be between ' + min + ' and ' + max + ' characters')
    return
  }

  // Search for database table user
  const users = db.collection('users')

  // Search for a user
  users.findOne(
    {
      // Search for input username
      username: currentUser
    },
    function(err, user) {
      if (err) {
        console.log(err)
      } else {
        argon2.hash(password).then(onhash)
      }
    }
  )

  // Will add hash to database
  function onhash(hash) {
    db.collection('users').insertOne(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        cover: req.file ? req.file.filename : null,
        gender: req.body.gender,
        gender_pref: req.body.gender_pref,
        birthday: req.body.birthday,
        age_pref_min: req.body.age_pref_min,
        age_pref_max: req.body.age_pref_max
      },
      doneInserting
    )

    // Going fo a sesion with user data
    function doneInserting(err, user) {
      req.session.user = user.ops[0]

      const data = {
        session: req.session.user
      }

      res.redirect('dashboard')
    }
  }
}

function logout(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      next(err)
    } else {
      res.redirect('/')
    }
  })
}

function singleProfile(req, res) {
  const data = {
    session: req.session.user,
    param: req.params.id,
    currentUser: ''
  }
  if (data.session) {
    console.log('render vanaf sessie')
    const mongoID = new mongo.ObjectID(req.params.id)
    db.collection('users').findOne(
      {
        _id: mongoID
      },
      function(err, user) {
        if (err) {
          console.log(err)
        } else {
          data.currentUser = user
          res.render('dashboard/profile.ejs', data)
        }
      }
    )
  } else {
    res.render('dashboard/profile.ejs', data)
  }
}

function notFound(req, res) {
  const data = {
    session: req.session.user,
    errorMessage: '404, pagina niet gevonden!'
  }

  res.render('front/error', data)
}

function myprofile(req, res) {
  const data = {
    session: req.session.user
  }

  res.render('dashboard/myprofile.ejs', data)
}

//function remove(req, res) {
//  const id = req.params.id
//
//  data = data.filter(function(value) {
//    return user.id !== id
//  })
//
//  res.json({
//    status: 'ok'
//  })
//}
