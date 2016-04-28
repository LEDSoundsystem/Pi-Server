var http = require('http');
var express = require('express');

var app = express();

var inputs = [{
pin: '11',gpio:'17',value:1},
{pin: '13',gpio:'18',value:0}
];

var song =  {    
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
};

app.use(express['static'](__dirname));

//Express route for incoming requests for a customer name
app.get('/inputs/:id',function(req,res){
	res.status(200).send(inputs[req.params.id]);
});


//Express route for any other unrecognized incoming requests

app.get('*',function(req,res){
	res.status(404).send('Unrecognized API call');
});

//Express route to handle errors
app.use(function(err,req,res,next){
	if(req.hxr){
		res.status(500).send('Ooops. Something went wrong.');
	}
	else {
		next(err);
	}
});

app.listen(3000);

console.log('App Server running at port 3000');

