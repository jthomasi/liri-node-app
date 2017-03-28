var command = process.argv[2];

if (command == "my-tweets") {

	var twitter = require('twitter');

	var client = (require('./keys')).twitterKeys;

	console.log(client);
	 
	var params = {screen_name: 'jay_aye_tea'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    console.log(tweets.text);
	  }
	});

}

else if (command == "spotify-this-song") {

	var song = process.argv[3];

	var spotify = require('spotify');
 
	spotify.search({ type: 'track', query: song }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	    else {
	    	console.log(data);
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