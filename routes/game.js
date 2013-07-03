
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

    Game.factory( {difficulty:req.body.difficulty,
                   width:8,
                   height:8
                  },
                 characters,
                 req.session.userId,
                 function(err, game) {
                     if(err) return next(err);
                     if( game)
                         res.render('placecharacters',
                                    {accountId:req.params.userid,
                                     game:game
                                    });
                     else
                         throw 'GET game:newGame - invalid Game object';
                });
};

//app.get('/user/:userid/game/new', user.ensureSignedIn, game.newGame);
exports.newGame = function(req, res, next){
    res.render('initialsettings',
               {accountId:req.params.userid,
                characters:defaultObjects.characters
               });

};

//app.post('/user/:userid/game:gameid/placecharacters', user.ensureSignedIn, game.placeCharacters);
exports.placeCharacters = function(req,res,next) {
    Game.findById( req.params.gameid, function(err,game) {
        if(err) return err;
        var dwelling = req.body.startlocation;

        // find dwelling encounter
        game.encounters.forEach( function(e) {
            if( e.dwellings) {
                e.dwellings.forEach( function(d) {
                    if( d == dwelling) {
                        // add party to encounters
                        game.characters.forEach( function(c) {
                            e.addCreature(c);
                        });

                        game.state = 'birdsong';
                        res.redirect( '/user/' + req.params.userid + '/game/' + req.params.gameid);
                        return;
                    }
                });
            }
        });
        
        // if we got here, there is no such dwelling
        throw 'GET /user/:userid/game/:gameid/placecharacters no such dwelling';
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