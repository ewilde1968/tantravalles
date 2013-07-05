
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
                         res.redirect('/user/' + req.params.userid + '/game/' + game._id.toHexString());
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

exports.placecharacters = function(inData,callback) {
    Game.findById( inData.gameid, function(err,game) {
        if(err) return next(err);
        var dwelling = inData.startlocation;

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
                        game.save( function(err, g) {
                            if(err) return next(err);

                            if( callback) callback({state:'birdsong'})
                        });

                        return;
                    }
                });
            }
        });
    });
};

exports.birdsong = function(inData,callback) {
    Game.findById( inData.gameid, function(err,game) {
        if(err) return next(err);
        
        var result = {state:'midmorning'};
        
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