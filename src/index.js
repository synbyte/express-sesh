// init project
var express = require("express");
var app = express();
var session = require("express-session");

// Using session middleware
app.use(
  session({
    secret: "a secret string",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  })
);

// Access the session with req.session
app.get("/", function(req, res, next) {
  if (req.session.views) {
    req.session.views++;
    res.setHeader("Content-Type", "text/html");
    res.write("<p>Views: " + req.session.views + "</p>");
    res.write("<p>Expiration: " + req.session.cookie.maxAge / 1000 + "s</p>");
    res.end();
  } else {
    req.session.views = 1;
    res.end(
      "Welcome to express-session. Refresh to see the view count increment."
    );
  }
});

// Listen on port 8080
var listener = app.listen(8080, function() {
  console.log("Listening on port " + listener.address().port);
});
