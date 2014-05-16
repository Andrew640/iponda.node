// -------------------------------------

var twitterlib = require('./../node-twitter');

var r = require('rethinkdb');

var twitter = new twitterlib({
    consumer_key: 'myB0Hr6IkRoX5IrkBPG0TXfMo',
    consumer_secret: '8NR75HQPf7rFUcXZlQNWGlW4vUh7uIq33RInPYTrbTstErqXiJ',
    access_token_key: '351505732-9Fk9UBGnkTFCBLyqYZhiMw1nhXdHIH5OIQkk9ZR4',
    access_token_secret: 'hLg57Z0BeaCscFvEV3rHr5QlmXyFd809ZZk7YgznBIDgz'
});

// ++++++++++++++++++++++++++++++++++++
// Connect to rethinkdb and set a
// global variable to store the
// connection
// ++++++++++++++++++++++++++++++++++++

var seconds = 5;
var millies = seconds * 1000;

var options = {
    host: 'localhost',
    port: 28015,
};

// ++++++++++++++++++++++++++++++++++++
// Function to run every XX seconds
// ++++++++++++++++++++++++++++++++++++

var torun = function(conn) {

    console.log('Running twitter scraping now');

    var tweets = r.db('twitter').table('handles').filter(function(row) {
        return row.hasFields('user_id').not();
    }).run(conn, function(err, cursor) {

        cursor.toArray(function(err, results) {

            results.forEach(function(result) {

                console.log(result.handle);

                twitter
                    .verifyCredentials(function() {})
                    .showUser(result.handle, function(data) {

                        // console.log('-------------showUser-----------------');
                        // console.log(data.id);

                        // Insert object.id into 'handles'

                        if (data.statusCode) return;

                        r.db('twitter').table('handles').get(result.handle).update({ user_id: data.id }).run(conn, function(err, summary) {
                            console.log(err);
                            console.log(summary);
                        });

                        r.db('twitter').table('handles').get(result.handle).hasFields('user_id').eq(!null).run(conn, function(err, summary) {
                            console.log(err);
                            console.log(summary);
                        });

                    })
                    .getUserTimeline({ screen_name: result.handle, count:200 }, function(data) {

                        // console.log('-------------getUserTimeline-----------------');
                        // console.log(data[0].text);

                        // Insert each object into 'tweets'

                        if (data.statusCode) return;

                        r.db('twitter').table('tweets').insert(data).run(conn, function(err, summary) {
                            console.log(err);
                            console.log(summary);
                        });

                    })
                ;


            });

        });

    });

};

// ++++++++++++++++++++++++++++++++++++
// Poll the database in a timer and
// get the twitter handles which have
// not got any user id assigned to them
// ++++++++++++++++++++++++++++++++++++

// var conn = r.connect(options);

// var tweets = r.db('twitter').table('handles').filter(r.row('user_id').eq(null)).run(conn);

r.connect(options, function(err, conn) {

    setInterval(function() {

        torun(conn);

    }, millies);

    // setInterval(torun, seconds*1000);

});

console.log('Running twitter scraping every ' + seconds + ' seconds');
