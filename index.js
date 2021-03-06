//required packages
let cors = require('cors')
let express = require('express');
let jwt = require('jsonwebtoken')
let morgan = require('morgan')
let rowdyLogger = require('rowdy-logger')
require('dotenv').config()
let expressJWT = require('express-jwt')

//initiate app
let app = express();
let rowdyResults = rowdyLogger.begin(app)

//middleware
app.use(express.urlencoded({ extended: false, limit: '50mb' }))
app.use(express.json({ limit: '10mb' }))
app.use(express.static(__dirname + '/client/build')) //add build middleware
app.use(cors())
app.use(morgan('dev'))

//controllers
app.use('/auth',expressJWT({
    secret: process.env.JWT_SECRET
}).unless({
    path: [
        {url: '/auth/login', methods: ['POST']},
        {url: '/auth/signup', methods: ['POST']},
        {url: '/auth/current/user', methods: ['PUT']}   
    ]
}), require('./controllers/auth'))


//routes
app.get('*',  (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html') //allows react to controll the file
})


//listening
app.listen(process.env.PORT || 3001, () => {
    console.log('Server started')
    rowdyResults.print()
})
