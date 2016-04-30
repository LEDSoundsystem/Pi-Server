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

// dummy song variable
var songs =  [];
var songsReceieved=0;

/**************************************************************
* Configure Express to serve index.html and any other static
* pages stored in the home directory.
***************************************************************/
app.use(express.static(__dirname));

/**************************************************************
* SONGS API CALLS - GET & POST
***************************************************************/
app.post('/songs',function(req,res){
    console.log("SONG POST RECEIVED");

    if(!req.body.song.hasOwnProperty('danceability') || !req.body.song.hasOwnProperty('energy')){
        res.statusCode = 400;
        return res.send("Error 400: Post syntax incorrect.");
    }

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
        "name": req.body.name,
        "heart_rate": [parseFloat(req.body.heart_rate)]
    };

    songs.push(newSong);
    res.json(songsReceieved);
    songsReceieved++;
});

app.post('/songs/:id',function(req,res){
    if( !req.body.hasOwnProperty('heart_rate') ){
        res.statusCode = 400;
        return res.send("Error 400: Post syntax incorrect.");
    }

    console.log("Heartrate recieved.");
    console.log(req.body);

    //push the new heartrate value onto the songs hear_rate array
    songs[req.params.id].heart_rate.push(parseFloat(req.body.heart_rate));

    res.json(true);

});

app.get('/songs/:id',function(req,res){
    //send an object as a JSON string
    console.log('id = '+req.params.id);
    res.send(songs[req.params.id]);
});

/**************************************************************
* Express route for any other unrecognised incoming requests
***************************************************************/

app.get('*', function (req, res) {
  res.status(404).send('Unrecognised API call.');
});

app.use(function (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send('Oops, Something went wrong!');
  } else {
    next(err);
  }
});

/**************************************************************
* Start the server on port 3000
***************************************************************/
app.listen(3000);
console.log('App Server is listening on port 3000');
