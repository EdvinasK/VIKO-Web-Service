var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var soap = require('soap');
var db = require('./db');


console.log("SOAP`o nespėjau implementuoti. Galvojau galėsiu pritaikyti serverinei aplikacijai gana greitai, bet klydau, nes per ilgai trukau kol node.js mokinaus. Jei nespėsiu iki 12h įdėti tada ohh well :D Gal galima bus atsiskaityti per skolų savaitę?");

// Naudojama nauja passport strategija, kuri verifikuoja ar pssw buvo įvestas teisingai
// ir naudojasi likusiomis dalimis, kad viską patvirtintų callbackų ir routų funkcijomis
passport.use(new Strategy(
  function(username, password, callback) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return callback(err); }
      if (!user) { return callback(null, false); }
      if (user.password != password) { return callback(null, false); }
      return callback(null, user);
    });
  }));


// Serializuojami, deserializuojami naudotojų ID kai naudotojo verifikacija eina per passport
passport.serializeUser(function(user, callback) {
  callback(null, user.id);
});

passport.deserializeUser(function(id, callback) {
  db.users.findById(id, function (err, user) {
    if (err) { return callback(err); }
    callback(null, user);
  });
});




// Expresso deklaracija
var app = express();

// Paprasti ejs route, kad aplikacija žinotų kaip naviguoti iki renderinamų ejs vietų
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Aprašomas visas middleware`as
// logging, parsing, ir session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Passport inicijavimas ir sesijos atstatymas
app.use(passport.initialize());
app.use(passport.session());

// Visų routų aprašai
app.get('/',
  function(request, response) {
    response.render('home', { user: request.user });
  });

app.get('/login',
  function(request, response){
    response.render('login');
  });
  
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(request, response) {
    response.redirect('/');
  });
  
app.get('/logout',
  function(request, response){
    request.logout();
    response.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(request, response){
    response.render('profile', { user: request.user });
  });

var portNo = 3000;

app.listen(portNo);
console.log("Server started on port: " + portNo);
