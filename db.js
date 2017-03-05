var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    id: String,
    pw: String
});
var Todo = new Schema({
    user_id: String,
    content: String,
    create_date: Date
});

mongoose.model('Todo', Todo);
mongoose.model('User', User);
mongoose.connect('mongodb://localhost/express-todo');