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
var totalSamples = 0;

/**************************************************************
* Update max heartrate
***************************************************************/

function updateSong(song){
    song.init_heart_rate = song.heart_rate[0];
    song.total_samples = totalSamples;
    song.max_heart_rate = Math.max(song.heart_rate);
    song.min_heart_rate = Math.min(song.heart_rate);
}

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

    if(!req.body.hasOwnProperty('danceability') || !req.body.hasOwnProperty('energy')){
        res.statusCode = 400;
        return res.send("Error 400: Post syntax incorrect.");
    }

    var newSong = {
                  "danceability": req.body.danceability,
                   "energy": req.body.energy,
                   "key": req.body.key,
                   "loudness": req.body.loudness,
                   "mode": req.body.mode,
                   "speechiness": req.body.speechiness,
                   "acousticness": req.body.acousticness,
                   "instrumentalness": req.body.instrumentalness,
                   "liveness": req.body.liveness,
                   "valence": req.body.valence,
                   "tempo": req.body.temp,
                   "duration_ms": req.body.duration_ms,
                   "time_signature": req.body.time_signature,
                   "track_href": req.body.track_href,
                   "heart_rate": [],
                   "time": [],
                   "init_heart_rate": 0,
                   "total_samples": 0
    };

    console.log(newSong);

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
    var hr = parseFloat(req.body.heart_rate);
    songs[req.params.id].heart_rate.push(hr);
    songs[req.params.id].time.push(parseFloat(req.body.time));

    totalSamples++;

    updateSong(songs[req.params.id]);


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
