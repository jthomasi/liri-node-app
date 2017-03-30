var command = process.argv[2];
var Twitter = require('twitter');
var Spotify = require('spotify');
var keys = require('./keys');

if (command == "my-tweets") {

	var api_keys = keys.twitterKeys;
	var client = new Twitter(api_keys);
	 
	var params = {screen_name: 'jay_aye_tea'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			var js = JSON.stringify(tweets);
			var obj = JSON.parse(js, function (key, value) {
			    if (key == "text") {
			        console.log(value);
			    } 
			});
		}
		else {
			console.log('Error occurred: ' + err);
	        return;
		}
	});
}

else if (command == "spotify-this-song") {

	var song = process.argv[3];
 
	Spotify.search({ type: 'track', query: song }, function(err, data) {
	    if (err) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	    else {
	    	console.log(data.tracks.items[0]);
	    	js = JSON.stringify(data.tracks.items[0]);
	    	var obj = JSON.parse(js, function (key, value) {
			    if (key == "name") {
			    	console.log(value);
			    }
			    else if (key == "external_urls") {
			    	console.log(value.spotify);
			    }
			});
	    }
	});

}

else if (command == "movie-this") {

	var movie = process.argv[3];

}

else if (command == "do-what-it-says") {

}

else {
	console.log("Please enter a proper command.");
}