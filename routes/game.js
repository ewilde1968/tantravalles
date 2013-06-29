
/*
 * GET home page.
 */
var Game = require('./../model/game'),
    defaultObjects = require('./../model/defaultObjects');

//app.post('/user/:userid/game/new', user.ensureSignedIn, game.createGame);
exports.createGame = function( req, res, next) {
    var characters = new Array();
    defaultObjects.characters.forEach( function(cName,index,arr) {
        if(req.body[cName] == "on")
            characters.push( cName);
    });

    Game.factory( {difficulty:"Tutorial",
                   width:32,
                   height:32
                  },
                 characters,
                 req.session.userId,
                 function(err, game) {
                     if(err) return next(err);
                     if( game)
                         res.redirect( '/user/' + req.session.userId + '/game/' + game._id.toHexString());
                     else
                         throw 'GET game:newGame - invalid Game object';
                });
};

//app.get('/user/:userid/game/new', user.ensureSignedIn, game.newGame);
exports.newGame = function(req, res, next){
    // TODO implement the new game wizard
    res.render('initialsettings',
               {accountId:req.params.userid,
                characters:defaultObjects.characters
               });

};

//app.get('/user/:userid/game/:gameid', user.ensureSignedIn, game.home);
exports.home = function( req, res, next) {
    Game.findById( req.params.gameid, function(err,game) {
        res.render( 'overworld',
                   {accountId:req.params.userid,
                    game:game
                   });
    });
};

//app.post('/user/:userid/game/:gameid', user.ensureSignedIn, game.update);
exports.update = function( req, res, next) {
    throw 'POST game:update - not yet implemented';
};