const { Actors } = require('../models/actor-model')
const { Movies } = require('../models/movie-model')

function errorHandler(req, res, next) {
    if (!req.body.id) {
        res.statusMessage = "Id is missing in the body of the request";
        return res.sendStatus(406);
    }

    if (req.body.id != parseInt(req.params.id)) {
        res.statusMessage = "Id and movie_ID don't match";
        return res.sendStatus(409);
    }

    if (!req.body.firstName || !req.body.firstName) {
        res.statusMessage = "You need to send both firstName and lastName of the actor to remove from the movie list";
        return res.sendStatus(403);
    }

    Actors.getActorByName(req.body.firstName).then(result => {
        if (!result) {
            res.statusMessage = "The actor or movie does not exist";
            return res.sendStatus(403);
        }
    })

    Movies.getMovieById(req.body.id).then(result => {
        if (!result) {
            res.statusMessage = "The actor or movie does not exist";
            return res.sendStatus(403);
        }
    })
    next();
}

module.exports = errorHandler;