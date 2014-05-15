// var express = require('express');
// var app = express();

// app.get('/', function(req, res){
//     res.send('No file entered');
// });
//
// app.get('/hello.txt', function(req, res){
//     console.log('Somebody has requested /hello.txt');
//     res.send('Hello World');
// });
//
// app.get('/goodbye.txt', function(req, res){
//     res.send('Goodbye World');
// });

// -------------------------------------

// var test = require('./test');
//
// console.log(test);
//
// var anything = new test();
//
// setInterval(function() {
//     console.log( Math.random() )
// }, 1000);
//
// app.get('/test', function(request, result) {
//     console.log('asd');
//     result.send( new Date().toString() );
// });

// var server = app.listen(3000, function() {
//     console.log('Listening on port %d', server.address().port);
// });

// -------------------------------------

var twitterlib = require('./../node-twitter');

var r = require('rethinkdb');

var twitter = new twitterlib({
    consumer_key: 'myB0Hr6IkRoX5IrkBPG0TXfMo',
    consumer_secret: '8NR75HQPf7rFUcXZlQNWGlW4vUh7uIq33RInPYTrbTstErqXiJ',
    access_token_key: '351505732-9Fk9UBGnkTFCBLyqYZhiMw1nhXdHIH5OIQkk9ZR4',
    access_token_secret: 'hLg57Z0BeaCscFvEV3rHr5QlmXyFd809ZZk7YgznBIDgz'
});

// twitter.search('nodejs OR #node', function(data) {
//     // console.log(data);
//
//     data.statuses.forEach(function(status) {
//         console.log(status);
//         console.log("\n\n\n\n\n\n\n-----------------------\n\n\n\n\n\n\n");
//     });
//
// });

// twitter.stream('statuses/sample', function(stream) {
//     stream.on('data', function(data) {
//         console.log(util.inspect(data));
//     });
// });

// twitter.stream('filter', { track:'#yourlife' }, function(stream) {
//
//     stream.on('data', function(data) {
//         console.log(data.user.screen_name + ' ##### ' + data.text);
//     });

var dbconnection = null;
var twitterhandlestogettweetsfor = [];

// ++++++++++++++++++++++++++++++++++++
// Connect to rethinkdb and set a
// global variable to store the
// connection
// ++++++++++++++++++++++++++++++++++++

var dboptions = {
    host: 'localhost',
    port: 28015,
};

var dbcallback = function(error, conn) {

    dbconnection = conn;

};

r.connect(dboptions, dbcallback);

// ++++++++++++++++++++++++++++++++++++
// Poll the database in a timer and
// get the twitter handles which have
// not got any user id assigned to them
// ++++++++++++++++++++++++++++++++++++

setInterval(function(){

    if (dbconnection) {

        console.log('checking for new handles');

        r.db('twitter').table('handles').run(dbconnection, function(err, cursor) {

            cursor.toArray(function(err, results) {

                results.forEach(function(result) {
                    twitterhandlestogettweetsfor[result.handle] = null;
                });

            });

        });

    }

}, 1000);


// ++++++++++++++++++++++++++++++++++++
// Poll the database in a timer and
// get the twitter handles which have
// not got any user id assigned to them
// ++++++++++++++++++++++++++++++++++++

setInterval(function(){

    if (dbconnection) {

        console.log('Running twitter checker');

        console.log(twitterhandlestogettweetsfor);

        twitterhandlestogettweetsfor.forEach(function(handle) {

            console.log(handle);

            // Call twitter
            //    Get id of user
            //    Get 200 tweets of user
            //    Update database with id and tweets

            // need to remove the item from the twitterhandlestogettweetsfor array

        });

    }

}, 5000);




/*

var handles = [
    'abcum',
    'wired',
    'techcrunch',
    'whoever'
];

var dboptions = {
    host: 'localhost',
    port: 28015,
    db: 'twitter',
};

var dbcallback = function(error, conn) {

    handles.forEach(function(handle) {

        console.log(handle);

        twitter.verifyCredentials(function(data) { }).getUserTimeline({ count: 1, screen_name:handle }, function(data) {

            console.log(data[0].user.screen_name + ' ::: ' + data[0].text);
            console.log("\n\n");

        });

    });

};

rethinkdb.connect(dboptions, dbcallback);
*/

/*


rethinkdb.connect({
    host: 'localhost',
    port: 28015,
    db: 'twitter',
}, function(err, conn) {

    console.log('Connected to rethinkdb');


    twitter.verifyCredentials(function(data) {
    });

    rethinkdb.table('handles').insert({handle: 'wired', id: null}).run(conn, function(err, data) {
        console.log(data);
    });

// if handle has no user id, get user id from twitter

    if (id == null).getUserTimeline(user_id, function(data) {
        console.log(data);

    // .getUserTimeline({user_id: not null, count:200}, function(data) {
    //     console.log(data);
    });

    // .showUser('abcum', function(data) {
    //     console.log(data.id);
    //     console.log('##########');
    // });
    //

});
*/


    // rethinkdb.dbList().run(conn, function(err, result) {
    //
    //     // cursor.each(console.log);
    //     console.log(result);
    //
    // });

    // twitter.stream('filter', { follow:'techcrunch,wired' }, function(stream) {
    //
    //     stream.on('data', function(data) {
    //
    //         console.log(data.user.screen_name + ' ##### ' + data.text);
    //
    //         rethinkdb.table('tweets').insert(data).run(conn, function(err, result) {
    //
    //         });
    //
    //     });
    //
    // });


    // Disconnect stream after 15 thousand milliseconds

    // setTimeout(stream.destroy, 15000);

// });

// app.get('/test', function(req, res) {
//
//     // console.log('asd');
//
//     anything.setGetField(13, new Date().toString() );
//
//     res.send( new Date().toString() );
//
// });

// var util = require('util'),
//     twitter = require('twitter');
// var twit = new twitter({
//     consumer_key: 'myB0Hr6IkRoX5IrkBPG0TXfMo',
//     consumer_secret: '8NR75HQPf7rFUcXZlQNWGlW4vUh7uIq33RInPYTrbTstErqXiJ',
//     access_token_key: '351505732-9Fk9UBGnkTFCBLyqYZhiMw1nhXdHIH5OIQkk9ZR4',
//     access_token_secret: 'hLg57Z0BeaCscFvEV3rHr5QlmXyFd809ZZk7YgznBIDgz'
//
// });

// app.get('/', twit.gatekeeper('/login'), routes.index);
// app.get('/login', routes.login);
// app.get('/twauth', twit.login());

// <a href="/twauth">Log in with Twitter</a>

// twit
//     .verifyCredentials(function(data) {
//         console.log(util.inspect(data));
//     })
//     .updateStatus('Test tweet from node-twitter/' + twitter.VERSION,
//         function(data) {
//             console.log(util.inspect(data));
//         }
//     );
