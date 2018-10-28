# Liri Bot

LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back the requested data from 3 sources (Spotify, OMDB, and Bands in Town).

## How it Works

1. Open the terminal/bash window.

2. To successfully retrieve the information please run an npm install first. This will load up the following Node packages:
    * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
    * [Moment](https://www.npmjs.com/package/moment)
    * [DotEnv](https://www.npmjs.com/package/dotenv)
    * [Request](https://www.npmjs.com/package/request)
    
    *Request is needed to grab data from the [OMDB API](http://www.omdbapi.com) and the [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)*

3. Liri can read 4 commands + a command-related keyword(s), then run a search and bring back a result that will be displayed in an organized way.

4. If the user doesn't know what or how to ask Liri, then writing the command will be enough for Liri to bring back something to the user to see.

## The Commands

These are the 4 commands that Liri can read:

    * concert-this
    * spotify-this-song
    * movie-this
    * do-what-it-says

## The Features

1. **Spotify**
    * `node liri spotify-this-song <any song title>`
        * This command will search and return the following information about the song in your terminal/bash window:
            * Artist(s)
            * The song's name
            * A preview link of the song from Spotify
            * The album that the song is from

    *If no song is provided then your program will default to "Last Nite" by The Strokes*

2. **Bands in Town**
    * `node liri concert-this <any artist/band name>`
        * This command will search and return the following information about the artist/band in your terminal/bash window:
            * Name of the venue
            * Venue location
            * Date of the Event (use moment to format this as "MM/DD/YYYY")

    *If no artist/band is provided then your program will default to Foo Fighters*

3. **OMDB**
    * `node liri movie-this <any movie title>`
        * This command will search and return the following information about the artist/band in your terminal/bash window:
            * Title of the movie.
            * Year the movie came out.
            * IMDB Rating of the movie.
            * Rotten Tomatoes Rating of the movie.
            * Country where the movie was produced.
            * Language of the movie.
            * Plot of the movie.
            * Actors in the movie.

    *If no movie title is provided then your program will default to Mr. Nobody*

3. **fs Node Package**
    * `node liri do-what-it-says
        * This command will use the "fs" Node Package and run a search inside local folder.
        * There is a .txt file that is linked and coded so that the program can access it and run a search with the information that is written inside.
        * The app will return the information on the song "I Want it that way"

        *I'm going to keep working on it so that Liri can run searches with the rest of the packages. I will also go and try to apend the searched items*
