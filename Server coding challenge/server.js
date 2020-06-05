const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const errorHandler = require('./middleware/errorHandler')
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const { Actors } = require('./models/actor-model')
const { Movies } = require('./models/movie-model')

const app = express();

app.patch('/api/remove-actor-from-movie/:id', jsonParser, errorHandler, (req, res) => {
    Actors.deleteActor(req.body.id).then(result => {
        if (result) {
            res.status = 201;
            res.send(result);
        } else {
            res.statusMessage = `We were'nt able to delete user with id ${req.body.id} because it doesn't exist`;
            res.sendStatus(404);
        }
    }).catch(err => {
        console.log(err);
        res.statusMessage = "An unexpected error ocurred in the database";
        res.sendStatus(500);
    })
})

app.patch('/api/delete-movie-actor/:id', jsonParser, errorHandler, (req, res) => {
    Actors.getActorByName(req.body.firstName).then(actor => {
        console.log(actor);
        console.log(actor['_id'])
        Movies.removeActorFromMovieList(req.body.id, actor['_id']).then(movie => {
            console.log(movie);
            if (movie) {
                res.status = 201;
                res.send(movie);
            } else {
                res.statusMessage = `We were'nt able to delete user with id ${req.body.id} because it doesn't exist`;
                res.sendStatus(404);
            }
        }).catch(err => {
            console.log(err);
            res.statusMessage = "An unexpected error ocurred in the database";
            res.sendStatus(500);
        })
    })
})

app.post('/api/create-actors', (req, res) => {
    console.log("about to create actors...");
    // Actors.createActor({
    //     actor_ID: 1,
    //     firstName: "Emilio",
    //     lastName: "Gonzalez",
    // })

    // Actors.createActor({
    //     actor_ID: 2,
    //     firstName: "Oscar",
    //     lastName: "Gonzalez",
    // })

    // Actors.createActor({
    //     actor_ID: 3,
    //     firstName: "Emilio",
    //     lastName: "Gonzalez",
    // })

    // Actors.createActor({
    //     actor_ID: 4,
    //     firstName: "Oscar",
    //     lastName: "Gonzalez",
    // })

    
    // Movies.createMovie({ movie_ID : 987, movie_title : "Movie 1", year : 2019, rating : 9.5, actors : [] })
    // Movies.createMovie({ movie_ID : 876, movie_title : "Movie 2", year : 2010, rating : 7.2, actors : [] })
    // Movies.createMovie({ movie_ID : 765, movie_title : "Movie 3", year : 1997, rating : 5.8, actors : [] })

    // Actors.getActorByName("Emilio").then(response => {
    //     console.log(response);
    //     Movies.addActorToMovie(765, response).then(res => {
    //         console.log("back from addActorToMovie");
    //         console.log(res);
    //     });
    // });

    // Movies.getMovieById(765).then(res => {
    //     console.log(res);
    // });

    // Movies.addActorToMovie()
        
})

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});