var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
var indexRouter = require('./routes/index');
const mongoose = require('mongoose')

var app = express();
dbURI = 'mongodb+srv://test1234:test1234@cluster0.ywrw3.mongodb.net/LibraryDatabase?retryWrites=true&w=majority'
mongoose.connect(dbURI)
.then(
  console.log('Connected to database')
 )
.then(
  app.listen(5000, ()=>{
    console.log(`server listening at port 5000`)
  })
)


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//ROUTES
app.use('/', indexRouter);


// catch 404 and forward to error handler


app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
