var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');
var User = mongoose.model('User');

function loginValid(req,res,next){
  if(!req.session.logined){
    res.redirect('/');
    return;
  }
  next();
}
/* GET home page. */
router.get('/',function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/todo', loginValid,function (req, res, next) {
  Todo.find({}, function (err, result) {
    res.render('todo', {
      todos: result
    });
  });
});

router.post('/todo', loginValid,function (req, res, next) {
  new Todo({
    content: req.body.content,
    create_date: Date.now()
  }).save(function (err, todo, count) {
    res.redirect('todo');
  })
});

router.get('/todo-delete',loginValid, function (req, res, next) {
  Todo.remove({
    _id: req.query._id
  }, function (err) {
    res.redirect('todo');
  })
});

router.post('/login', function (req, res, next) {
  let id = req.body.id;
  let pw = req.body.password;
  if (id === 'jex' && pw === '123') {
    req.session.logined = true;
    res.redirect('todo');
  } else {
    res.redirect('/');
  }
});

module.exports = router;