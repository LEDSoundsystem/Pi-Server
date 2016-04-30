/**
 * myapi.js
 *
 * @author Evan Nichols
 * @version 0.1
 *
 */

var http        = require('http');
var express     = require('express');
var bodyParser  = require('body-parser');

var app         = express();

app.use(bodyParser.json());

/**************************************************************
* Arrays to hold song information and heartrate values as they
* are sent from the iOS application.
***************************************************************/
var inputs = [    { pin: '11', gpio: '17', value: 1 },
                  { pin: '12', gpio: '18', value: 0 }
];

var quotes = [
  { author : 'Audrey Hepburn', text : "Nothing is impossible, the word itself says 'I'm possible'!"},
  { author : 'Walt Disney', text : "You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you"},
  { author : 'Unknown', text : "Even the greatest was once a beginner. Don't be afraid to take that first step."},
  { author : 'Neale Donald Walsch', text : "You are afraid to die, and you're afraid to live. What a way to exist."}
];

// dummy song variable
var songs =  [
        {
            "song": {
                      "danceability": 0.735,
                      "energy": 0.578,
                      "key": 5,
                      "loudness": -11.84,
                      "mode": 0,
                      "speechiness": 0.0461,
                      "acousticness": 0.514,
                      "instrumentalness": 0.0902,
                      "liveness": 0.159,
                      "valence": 0.624,
                      "tempo": 98.002,
                      "duration_ms": 255349,
                      "time_signature": 4,
                    },
            "name": "Cut Your Teeth",
            "heart_rate": 68.78
        }
      ];

/**************************************************************
* Configure Express to serve index.html and any other static
* pages stored in the home directory.
***************************************************************/
app.use(express.static(__dirname));

/**************************************************************
* QUOTES API CALLS - GET & POST (EXAMPLES)
***************************************************************/
app.get('/', function(req, res) {
    res.type('text/plain');
    res.send("Hello there! Nice GET!");
    console.log("HELLO!");
});

app.get('/quote/:id', function (req, res) {
  // send an object as a JSON string
  console.log('id = ' + req.params.id);
  res.send(quotes[req.params.id]);
});

app.post('/quote',function(req,res){

    if( !req.body.hasOwnProperty('author') || !req.body.hasOwnProperty('text') ){
            res.status(400);
            return res.send('Error 400: Post syntax incorrect.');
        }

    console.log("AUTHOR: " + req.body.author);
    console.log("TEXT: " + req.body.text);

    var newQuote = {
        author: req.body.author,
        text: req.body.text
    };

    quotes.push(newQuote);
    res.json(true);
})

/**************************************************************
* SONGS API CALLS - GET & POST
***************************************************************/
app.post('/songs',function(req,res){
    console.log("SONG POST RECEIVED");
    
    if(!req.body.hasOwnProperty('danceability') || !req.body.hasOwnProperty('energy')){
        res.statusCode = 400;
        return res.send("Error 400: Post syntax incorrect.");
    }

    console.log(req.body);
    /*
    var newSong = {
        "song":{    "danceability": req.body.song.danceability,
                    "energy": req.body.song.energy,
                    "key": req.body.song.key,
                    "loudness": req.body.song.loudness,
                    "mode": req.body.song.mode,
                    "speechiness": req.body.song.speechiness,
                    "acousticness": req.body.song.acousticness,
                    "instrumentalness": req.body.song.instrumentalness,
                    "liveness": req.body.song.liveness,
                    "valence": req.body.song.valence,
                    "tempo": req.body.song.temp,
                    "duration_ms": req.body.song.duration_ms,
                    "time_signature": req.body.song.time_signature,
        },
        "name": req.body.songName,
        "heartRate": request.body.heartRate
    };

    quotes.push(newSong);
    */
    res.json(true);
});

app.get('/songs/:id',function(req,res){
    //send an object as a JSON string
    console.log('id = '+req.params.id);
    res.send(songs[req.params.id]);
}) // apt.get()

// Express route for incoming requests for a single input
app.get('/inputs/:id', function (req, res) {
  // send an object as a JSON string
  console.log('id = ' + req.params.id);
  res.send(inputs[req.params.id]);
}); // apt.get()

// Express route for incoming requests for a list of all inputs
app.get('/inputs', function (req, res) {
  // send an object as a JSON string
  console.log('all inputs');
  res.status(200).send(inputs);
}); // apt.get()

// Express route for any other unrecognised incoming requests
app.get('*', function (req, res) {
  res.status(404).send('Unrecognised API call.');
});

// Express route to handle errors
app.use(function (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send('Oops, Something went wrong!');
  } else {
    next(err);
  }
}); // apt.use()

// ------------------------------------------------------------------------
// Start Express App Server
//
app.listen(3000);
console.log('App Server is listening on port 3000');
