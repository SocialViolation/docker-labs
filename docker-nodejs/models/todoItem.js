'use strict';

var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: Boolean
});
module.exports = {
    TodoItem: mongoose.model('TodoItem', todoSchema)
}
