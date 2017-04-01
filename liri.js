var command = process.argv[2];
var Twitter = require('twitter');
var Spotify = require('spotify');
var Omdb = require('omdb');
var keys = require('./keys');
var fs = require("fs");

if (command == "my-tweets") {

	var api_keys = keys.twitterKeys;
	var client = new Twitter(api_keys);
	 
	var params = {screen_name: 'jay_aye_tea'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			console.log("--------------------------------------------------------------");
			console.log("Here is a list of @jay_aye_tea's most recent tweets! Enjoy!");
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
		console.log("--------------------------------------------------------------");
	});
}

else if (command == "spotify-this-song") {

	if (!process.argv[3]) {
		var songTitle = "Hey ya";
	}
	else {
		var song = "";
		for (var i=3;i<(process.argv.length);i++) {
			var a = process.argv[i];
			song += a+" ";
		}
		var songTitle = song.trim();
	}
	
	Spotify.search({ type: 'track', query: songTitle }, function(err, data) {
	    if (err) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	    else {
	    	var songInfo = data.tracks.items[0];
	    	console.log("--------------------------------------------------------------------");
	    	console.log("You searched for \""+songTitle+"\" in Spotify. Here's what we got: ");
	    	console.log("--------------------------------------------------------------------");
	    	console.log("Song Name: "+songInfo.name);
	    	console.log("Band Name: "+songInfo.artists[0].name);
	    	console.log("Album Name: "+songInfo.album.name);
	    	console.log("Spotify Link: "+songInfo.preview_url);
	    	console.log("--------------------------------------------------------------------");
	    }
	});
}

else if (command == "movie-this") {

	if (!process.argv[3]) {
		var movieTitle = "Mr.Nobody";
	}
	else {
		var movie = "";
		for (var i=3;i<(process.argv.length);i++) {
			var a = process.argv[i];
			movie += a+" ";
		}
		var movieTitle = movie.trim();
	}
	Omdb.get({ title: movieTitle }, true, function(err, movie) {

	    if(err) {
	        return console.error(err);
	    }
	 
	    if(!movie) {
	        return console.log('Movie not found!');
	    }
	 
	    console.log("Movie: "+movie.title, "("+movie.year+")");
	    console.log("IMDB Rating: "+movie.imdb.rating);
	    console.log("Countries released: "+movie.countries);
	    
	    console.log("Plot: "+movie.plot);
	    console.log("Actors: "+movie.actors);
	    // language, RT score, RT link
	    
	});

}

else if (command == "do-what-it-says") {

	fs.readFile("random.txt", "utf8", function(err, data){

		if (err) {
			return console.log(err);
		}
		else {

			var dataArr = data.split(",");

			var spotSong;

		    for (var i=0 ; i<dataArr.length ; i++) {

		    	spotSong = dataArr[i];
		        
		    }

		    Spotify.search({ type: 'track', query: spotSong }, function(err, data) {
			    if (err) {
			        console.log('Error occurred: ' + err);
			        return;
			    }
			    else {
			    	var songInfo = data.tracks.items[0];
			    	console.log("--------------------------------------------------------------------");
			    	console.log("The song "+spotSong+" has been pulled from our .txt file and searched in Spotify. Here's what we got: ");
			    	console.log("--------------------------------------------------------------------");
			    	console.log("Song Name: "+songInfo.name);
			    	console.log("Band Name: "+songInfo.artists[0].name);
			    	console.log("Album Name: "+songInfo.album.name);
			    	console.log("Spotify Link: "+songInfo.preview_url);
			    	console.log("--------------------------------------------------------------------");
			    }
			});

		}

	});
}

else {
	console.log("Please enter a proper command.");
}