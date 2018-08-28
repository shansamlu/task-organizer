var Task = require('../models/taskModel');
var User = require('../models/userModel');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

module.exports = function(app) {
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Get Task info based on task natural Id
    // http://localhost:3000/api/tasks/0
    app.get('/api/tasks/:taskId', function (req, res) {

        Task.findOne({taskId: req.params.taskId }).populate('userId').exec(function (err, tasks) {

            if (err) throw err;
            res.send(tasks)

        });
    });


    // Get User info based on user name
    app.get('/api/users/:userName', function (req, res) {

        User.findOne({name: req.params.userName}).exec(function (err, user) {
            if (err) throw err;
            res.send(user)
        });
    });

    // Create new User
    app.post('/api/newuser', function (req, res) {

        User.findOne({name: req.body.userName}).exec(function (err, user) {
            if (err) throw err;

            if (user)
                res.send("User Name exists.")
            else {
                var newUser = User ({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.userName
                });

                newUser.save(function (err) {
                    if (err) throw err;
                    res.send('Success')
                })
            }

        });

    });


    // Create new Task
    app.post('/api/newtasks', function (req, res) {

        var newTask = Task({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            description: req.body.description,
            status: req.body.status
        });

        newTask.save(function (err) {
            if (err) throw err;
            res.send('Success');
        })

    });

    // Update Task based on task natural Id
    app.post('/api/updatetasks', function (req, res) {
        if (req.body.taskId) {
            Task.findByIdAndUpdate(req.body.taskId, { status: req.body.status, userId: req.body.userId }, function(err, tasks) {
                if (err) throw err;

                res.send("Success");
            });
        } else {
            res.send("Cannot find taskId")
        }

    });

    
}