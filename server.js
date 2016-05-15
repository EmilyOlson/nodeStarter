// here for when we want to start breaking off child processes
var cluster = require('cluster');
if (cluster.isMaster) {
    // get cpu count on current machine
    var cpuCount = require('os').cpus().length;

    // create a worker for each thread
    for (var i = 0; i < cpuCount; i+=1) {
        cluster.fork();
    }
    cluster.on('exit', function(worker){
        //replace dead worker
        console.log('Worker %d died', worker.id);
        cluster.fork();
    })

} else {

    var express = require('express');
    var app = express();
    var bodyParser = require('body-parser');
    var path = require('path');
    var api = require('./api/routes.js');

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/dbname'); // enter db name

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    // static files
    app.use(express.static('app'));

    // api
    api(app);

    // spa
    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname + '/index.html'));
    });

    var server = app.listen(666, function () {
        console.log( 'Worker %d is running at ' + 666, cluster.worker.id);
    });
}
