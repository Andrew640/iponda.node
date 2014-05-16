// -------------------------------------

var twitterlib = require('./../node-twitter');

var r = require('rethinkdb');

var twitter = new twitterlib({
    consumer_key: 'myB0Hr6IkRoX5IrkBPG0TXfMo',
    consumer_secret: '8NR75HQPf7rFUcXZlQNWGlW4vUh7uIq33RInPYTrbTstErqXiJ',
    access_token_key: '351505732-9Fk9UBGnkTFCBLyqYZhiMw1nhXdHIH5OIQkk9ZR4',
    access_token_secret: 'hLg57Z0BeaCscFvEV3rHr5QlmXyFd809ZZk7YgznBIDgz'
});

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


// twitter.search('nodejs OR #node', function(data) {
//     // console.log(data);
//
//     data.statuses.forEach(function(status) {
//         console.log(status);
//         console.log("\n\n\n\n\n\n\n-----------------------\n\n\n\n\n\n\n");
//     });
//
// });

var dbconnection = null;
var twitterhandlestogettweetsfor = [    ];

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

        r.db('twitter').table('handles').filter(r.row('user_id').eq(null)).run(dbconnection, function(err, cursor) {

            cursor.toArray(function(err, results) {

                results.forEach(function(result) {
                    twitterhandlestogettweetsfor.push(result.handle);
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



            handles.forEach(function(handle) {

                console.log(handle);

                twitter.verifyCredentials(function(data) { }).getUserTimeline({ count: 1, screen_name:handle }, function(data) {

                    console.log(data[0].user.screen_name + ' ::: ' + data[0].text);
                    console.log("\n\n");

        });

    });

            // Call twitter
            //    Get id of user
            //    Get 200 tweets of user
            //    Update database with id and tweets

            // need to remove the item from the twitterhandlestogettweetsfor array

        });

    }

}, 5000);
