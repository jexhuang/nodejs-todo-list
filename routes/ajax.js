var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');

router.get('/', function (req, res, next) {
    res.render('todo_ajax', {
        title:'Todo Ajax'
    });
});

router.post('/create', function (req, res, next) {
    new Todo({
        content: req.body.content,
        create_date: Date.now()
    }).save(function (err, todo, count) {
        if (!err) {
            res.json({
                success: true
            });
        } else {
            res.redirect('/error');
        }

    })
});

router.post('/delete', function (req, res, next) {
    Todo.remove({
        _id: req.body._id
    }, function (err) {
         if (!err) {
            res.json({
                success: true
            });
        } else {
            res.redirect('/error');
        }
    })
});

router.get('/findall', function (req, res, next) {
    Todo.find({}, function (err, result) {
        res.json(result);
    });
});

module.exports = router;