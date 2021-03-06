var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require("express-session");
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon')
var passport = require('passport');
var infoAPI = require("./routes/apiInfo.js");
var FacebookStrategy = require('passport-facebook');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

var adminRedirect = require('./routes/admin.redirect');

var indexRouter = require('./routes/index');
var dropRouter = require('./routes/post.drop');
var activeRouter = require('./routes/post.active');
var updateRouter = require('./routes/post.update');
var dashboardRouter = require('./routes/get.dashboard');
var shareRouter = require('./routes/post.share');
var logoutRouter = require('./routes/logout');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(favicon(path.join(__dirname, 'public', 'icon.ico')))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(
                { secret: 'coppycat',
                  resave: false,
                  saveUninitialized: false,
                  cookie:{
                    expires: new Date(253402300000000)
                  }
                }
              ));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new FacebookStrategy(infoAPI, function(accessToken, refreshToken, profile, done) {
      done(null, profile);
    })|| new LocalStrategy(function(username, password, done) {
   
    })
    )
passport.serializeUser((user, done)=>{
  done(null, user)
})
passport.deserializeUser((id, done)=>{
  done(null, id)
})
app.route("/facebook").get(passport.authenticate("facebook"));
app.get('/signin', passport.authenticate('facebook'));
app.use('/admin', adminRedirect);
app.use('/', indexRouter);
app.use('/dashboard', dashboardRouter);
app.use('/drop', dropRouter);
app.use('/ad', activeRouter);
app.use('/update', updateRouter);
app.use('/share', shareRouter);
app.use('/logout', logoutRouter);

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
