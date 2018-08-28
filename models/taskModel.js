var mongoose = require('mongoose');
var autoIncrement = require('mongoose-plugin-autoinc');


var Schema = mongoose.Schema;

var taskSchema = new Schema({
    _id: String,
    taskId: Number,
    name: String,
    description: String,
    status: String,
    updated: {type: Date, default: Date.now},
    userId: {type: Schema.Types.ObjectId, ref: 'User'}
});

taskSchema.plugin(autoIncrement.plugin, {model:'Task', field:'taskId'});

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;