const express = require('express')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('./lib/passportConfig')
const port = 3000


app.listen(port, () => {
    console.log(`server is running on ${port}`)
})

//intialize the layout
const expressLayout = require('express-ejs-layouts')

//
app.use(expressLayout)


//import routes
const indexRoute = require('./routes/index')
const authRoute = require('./routes/auth')

app.use(session({
    secret: 'supersecuresecret!',
    saveUninitialized: true,
    resave: false,
    cookie: {maxAge: 604800}
}))
app.use(passport.initialize())
app.use(passport.session())


//Mount routes
app.use('/', indexRoute)
app.use('/', authRoute)
app.use(express.static('public')) // for bootstrab



mongoose.set('strictQuery', false)

//Node.js to look in a folder called views for all the ejs files.
app.set("view engine", "ejs");

mongoose.connect("mongodb+srv://Mahmood_Ibrahim:H001216317oda@mahmood.yt3yrm3.mongodb.net/parking_app?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology : true
    },
    () => {
        console.log('MongooDB connected')
    }
)

app.get('/a', (req,res) => {
    res.render('home/another')
})

//********************************************************************************* */

// app.get('/b', (req,res) => {
//     res.render('auth/signin')
// })

