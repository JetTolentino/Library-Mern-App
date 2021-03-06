var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
var indexRouter = require('./routes/index');
const mongoose = require('mongoose')
require('dotenv').config()

var app = express();
const dbURI = process.env.MONGODB_URI
mongoose.connect(process.env.MONGODB_URI)
.then(
  console.log('Connected to database')
 )
.then(
  app.listen(process.env.PORT || 5001, ()=>{
    console.log(`server listening at port 5001`)
  })
)

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



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
