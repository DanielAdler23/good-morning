var MongoClient = require('mongodb').MongoClient;

var express = require('express')
var app = express()
var db = require('./database')

var mongoUrl = 'mongodb://ohadG:blabla123@ds127988.mlab.com:27988/boker_tov'

app.use('/tweets', require('./routes'))

db.connect(mongoUrl, function(err) {
    if (err) {
        console.log('Unable to connect to mlab.')
        process.exit(1)
    } else {
        app.listen(process.env.PORT || 3000, function() {
            console.log('Listening on port 3000...')
        })
    }
})