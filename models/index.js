let mongoose = require('mongoose')


//connect to mongodb
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/hackathon', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

module.exports.User = require('./user')



