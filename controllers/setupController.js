var mongoose = require('mongoose');

var Task = require('../models/taskModel');
var User = require('../models/userModel');

module.exports = function(app) {

   app.get('/api/setupTaskUsers', function(req, res){

       var user = new User({
           _id: new mongoose.Types.ObjectId(),
           name: 'TestUser'
       });

       user.save(function (err) {
           if (err) throw err;

           var task = new Task({
               _id: new mongoose.Types.ObjectId(),
               taskId: 'taskId',
               name: 'TestTask',
               description: 'This is Test Task.',
               status: 'Pending',
               user: user._id
           });

           task.save(function (err) {
               if (err) throw err;
               res.send('Success');
           })
       });


       //
       // User.create(user, function (err, results) {
       //     if (err) throw err;
       //
       //     var task = new Task({
       //         _id: new mongoose.Types.ObjectId(),
       //         name: 'TestTask',
       //         description: 'This is Test Task.',
       //         status: 'Pending',
       //         userId: user._id
       //     });
       //     var userResult = results;
       //     Task.create(task, function (err, results) {
       //         if (err) throw err;
       //         res.send([userResult,results]);
       //
       //     });
       //
       // });


   });



    
}