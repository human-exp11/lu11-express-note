const express = require('express');
const api = require('./routes/apiRoutes.js');
const html= require('./routes/htmlRoutes.js');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3001;

// middleware for the Express app to find/use files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static( 'public'));
app.use('/api', api);
app.use('/', html);

//listerner for app
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
  
module.exports = app;