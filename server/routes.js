var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')
var db = require('./database')

router.use(bodyParser.json({limit: '5mb'}))
router.use(bodyParser.urlencoded({limit: '5mb', extended: true }))

router.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-requested-with");
    res.header("Access-Control_Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.set("Content-Type", "application/x-www-form-urlencoded");
    next();
});
router.get('/', function (req, res) {
    console.log('Get All Tweets')
    var tweets = db.get().collection('processed_tweets')
    tweets.find().limit(1000).toArray(function(err, docs) {                       //limit because we have too many tweets - +25,000
        err ? res.status(404).send({error:err}) : res.jsonp({eqfeed_callback: docs})
    })
})

router.get('/country/:country', function(req, res) {
    var country = req.params.country
    console.log(`Get Tweets By Country - ${country}`)
    var tweets = db.get().collection('processed_tweets')
    tweets.find({"location.country": country}).toArray(function(err, docs) {
        err ? res.status(404).send({error:err}) : res.status(200).send(docs)
    })
})

router.get('/word/:word', function(req, res) {
    var word = req.params.word
    console.log(`Get Tweets With Specific Word - ${word}`)
    var tweets = db.get().collection('processed_tweets')
    tweets.find({text: {$regex: `.*${word}.*`}}).toArray(function(err, docs) {
        err ? res.status(404).send({error:err}) : res.status(200).send(docs)
    })
})

router.get('/time/:time', function(req, res) {
    var time = req.params.time
    console.log(`Get Tweets For Specific Time - ${time}`)
    var tweets = db.get().collection('processed_tweets')
    tweets.find({timestamp: time}).toArray(function(err, docs) {
        err ? res.status(404).send({error:err}) : res.status(200).send(docs)
    })
})

module.exports = router