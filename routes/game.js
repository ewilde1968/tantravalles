
/*
 * GET home page.
 */
var Account = require('./../model/account');

//app.get('/user/:userid/game/new', user.ensureSignedIn, game.newGame);
exports.newGame = function(req, res, next){
    throw 'GET game:home - not yet implemented';
};

//app.post('/user/:userid/game/new', user.ensureSignedIn, game.createGame);
exports.createGame = function( req, res, next) {
    Game.create( req.body.settings, req.body.character, req.session.userId, function(err, game) {
        if(err) return next(err);

        if( game)
            res.redirect( '/user/' + req.session.userId + '/game/' + game._id.toHexString());
        else
            throw 'POST game:createGame - invalid Game object';
    });
};

//app.get('/user/:userid/game/:gameid', user.ensureSignedIn, game.home);
exports.home = function( req, res, next) {
    throw 'GET game:home - not yet implemented';
};

//app.post('/user/:userid/game/:gameid', user.ensureSignedIn, game.update);
exports.update = function( req, res, next) {
    throw 'POST game:update - not yet implemented';
};