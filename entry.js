const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect('mongodb://localhost:27017/loginapp');

mongoose.connection.on('connected', () =>{
    console.log('Connected to database'+config.database);
});
mongoose.connection.on('error', (err) =>{
    console.log('database error'+config.database);
});

const users = require('./routes/users');

const app = express();
//middleware
app.use(cors());
//middleware
app.use(bodyParser.json());
///middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);

//set static folder
app.use(express.static(path.join(__dirname, 'client')))

//port number
const port = 3000;
//index route
app.get('/',(req,res)=>{
    res.send('invalid endpoint');
});
//start server 
app.listen(port, ()=>{
    console.log('server started on port '+ port);
});