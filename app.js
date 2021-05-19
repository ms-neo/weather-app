// require('dotenv').config();
const express = require('express');
// const ejs = require('ejs');
const bodyParser = require('body-parser');
// const axios =require('axios')


const app = express();
const log = console.log;

//middlewares 
app.use(express.static('public'));
app.use('/css' , express.static(__dirname+'public/css'));
app.use('/img' , express.static(__dirname+'public/img'));
app.use('/js' , express.static(__dirname+'public/js'));


app.set('view engine', 'ejs');
app.set('views' , './src/views')


app.use(bodyParser.urlencoded({
  extended: true
}));

const weatherRouter = require('./src/routes/weather.js');

app.use('/', weatherRouter);
// app.use('/weather', weatherRouter);
// app.use('/error', weatherRouter);

const port = process.env.PORT || '3000';

app.listen(port, () => {
  log('the server is working on port 3000')
});