const mongoose = require( 'mongoose' );

const moviesSchema = mongoose.Schema({
    movie_ID : {
        type : Number,
        unique : true,
        required : true
    },
    movie_title : {
        type : String,
        required : true
    },
    year :  {
        type : Number,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    actors : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'actors',
        required : true
    }]
});

const moviesCollection = mongoose.model( 'movies', moviesSchema );

const Movies = {
    createMovie : function( newMovie ){
        return moviesCollection
                .create( newMovie )
                .then( createdMovie => {
                    return createdMovie;
                })
                .catch( err => {
                    throw new Error( err );
                });
    },
    getMovieById : function( id ){
        return moviesCollection
                .findOne( {movie_ID : id} )
                .then( movie => {
                    return movie;
                })
                .catch( err => {
                    throw new Error( err );
                });
    },
    addActorToMovie : function( idMovie, actor ){
        return moviesCollection
                .findOne({movie_ID: idMovie})
                .then( movie => {
                    const movieActors = movie.actors;
                    movieActors.push(actor);
                    moviesCollection.updateOne({movie_ID: idMovie}, { actors: movieActors })
                    .then( updatedMovie => {    
                        return updatedMovie
                    }).catch( err => {
                        throw new Error( err );
                    });
                })
                .catch( err => {
                    throw new Error( err );
                });
    },
    removeActorFromMovieList : function( movieId, actorId ){
        return moviesCollection
                .findOne({movie_ID: movieId})
                .then( movie => {
                    const movieActors = movie.actors;
                    const tempActors = []
                    for (let i = 0; i<movie.actors.length; i++) {
                        if (String(movieActors[i])  != String(actorId)) {
                            tempActors.push(movieActors[i]);
                        }
                    }
                    console.log(tempActors);
                    moviesCollection.updateOne({movie_ID: movieId}, { actors: tempActors })
                    .then( updatedMovie => {    
                        return updatedMovie
                    }).catch( err => {
                        throw new Error( err );
                    });
                    
                })
                .catch( err => {
                    throw new Error( err );
                });
    },
}

module.exports = {
    Movies
};

