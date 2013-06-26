
/*
 * GET home page.
 */
var Game = require('./../model/game');

//app.post('/user/:userid/game/new', user.ensureSignedIn, game.createGame);
exports.createGame = function( req, res, next) {
    throw 'POST game:createGame - not implemented';
};

//app.get('/user/:userid/game/new', user.ensureSignedIn, game.newGame);
exports.newGame = function(req, res, next){
    // TODO implement the new game wizard
    req.body.character = "White Knight";
    req.body.settings = { difficulty:"Tutorial" };
    
    Game.factory( req.body.settings, req.body.character, req.session.userId, function(err, game) {
        if(err) return next(err);

        if( game)
            res.redirect( '/user/' + req.session.userId + '/game/' + game._id.toHexString());
        else
            throw 'GET game:newGame - invalid Game object';
    });
};

//app.get('/user/:userid/game/:gameid', user.ensureSignedIn, game.home);
exports.home = function( req, res, next) {
    Game.findById( req.params.gameid, function(err,game) {
        res.render( 'overworld',
                   {game:game}
                    );
    });
};

//app.post('/user/:userid/game/:gameid', user.ensureSignedIn, game.update);
exports.update = function( req, res, next) {
    throw 'POST game:update - not yet implemented';
};