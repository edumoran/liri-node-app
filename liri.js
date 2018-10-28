require("dotenv").config();

//First we write down the packages that we will be installing and using throughout the app (npm install...)
var request = require("request");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");

//Import/link the keys.js file and make it a variable
var keys = require("./keys");

//The instructions say that we shall start with the "concert-this" query, however since I have already made the files and API request for spotify I will start with this one. 
var spotify = new Spotify(keys.spotify);

//This is the variable that will be used to store the user commands.
// command 1: node liri spotify-this-song + "name of the song"
// command 2: node-liri concert-this + "artist or band name"
// command 3: node liri movie-this + "name of the movie"
// command 4: node liri do-what it says (this will run the query written in the file)
var command = process.argv[2];

//Here we look for the songs
if (command == "spotify-this-song") {
    var song = process.argv.slice(3, process.argv.length).join(" ");
    if (song === "") {
        console.log("Please enter a song name, if you don't know what to search I can suggest you something:")
        console.log("**********************************");
        song = "Last nite";
        console.log(song);
    };

    spotify.search({
        type: "track",
        query: song
    }, function (err, data) {
        //If the input isn't right, it will console.log the following error message + the error found
        if (err) {
            return console.log("Oops! something went wrong: " + err);
        }
        //The information that will be fecthed has to be console logged (Artist + Song Name + URL + Album)
        console.log("Artist Name: " + data.tracks.items[0].album.artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Preview URL: " + data.tracks.items[0].preview_url ? data.tracks.items[0].preview_url : "Not Available");
        console.log("Album Name: " + data.tracks.items[0].album.name);

    });
}

//Here we look for the concerts
else if (command == "concert-this") {
    var artist = process.argv.slice(3, process.argv.length).join(" ");
    if (artist === "") {
        console.log("Please enter an artist or a band name, if you don't know what to search I can suggest you something:");
        console.log("**********************************");
        artist = "Foo Fighters";
        console.log(artist);
    };

    queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    request(queryUrl, function (err, response, body) {

        if (!err && response.statusCode === 200) {

            var jsonBody = JSON.parse(body);
            //JSON is needed at this point in order to parse the information that will be fetched from the site. A for loop is needed so that the app can make the calls to get the info.
            for (i = 0; i < jsonBody.length; i++) {
                console.log("Venue Name : " + JSON.parse(body)[i].venue.name);
                city = JSON.parse(body)[i].venue.city;
                state = JSON.parse(body)[i].venue.region;
                country = JSON.parse(body)[i].venue.country;
                console.log("Location : " + city + ", " + state + ", " + country);
                date = moment(JSON.parse(body)[i].datetime).format('DD MM YYYY');
                console.log("Date: " + date);
                console.log("**********************************");
            }
        }
    });
}

//Here we look for the movies
else if (command == "movie-this") {
    var movie = process.argv.slice(3, process.argv.length).join(" ");
    if (movie === "") {
        console.log("Please enter a movie name, if you don't know what to search I can suggest you something:");
        console.log("**********************************");
        movie = "Mr. Nobody";
        console.log(movie);
    }
    queryUrl = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie;
    request(queryUrl, function (err, response, body) {
        if (!err && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Released: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Produced in: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Starring: " + JSON.parse(body).Actors);
            console.log("**********************************");
        }
    });
}

//Here we will call the random.txt file and display the info that is written.
else if (command == "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        console.log(data);

        //We have the name of the artist and the name of the song. We will use the split method to separate them and take the input in position [1] which is the song name.
        var dataArr = data.split(",");
        var song = dataArr[1]
        
        //Once the song name is taken, the app will run a search for it and console.log the results (same procedure as before) 
        spotify.search({
            type: 'track',
            query: song
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            console.log("Song Name : " + data.tracks.items[0].name);
            console.log("Preview URL : " + (data.tracks.items[0].preview_url ? data.tracks.items[0].preview_url : "Not Available"));
            console.log("Album Name: " + data.tracks.items[0].album.name);
            console.log("Artist Name: " + data.tracks.items[0].album.artists[0].name);

        });
    });

}