require('dotenv').config();
const express = require('express')
const weatherRouter = express.Router();
const axios = require('axios');
const fetch =require('node-fetch');

const log = console.log;

weatherRouter.get('/', (req, res) => {
    res.render('weather', {
        data: '',
        quotes: '',
        suggest:'',
    })
});

weatherRouter.get('/error', (req, res) => {
    res.render('error')
});

weatherRouter.post('/', async (req, res) => {
    const city = req.body.cityname;
    const apiKey = process.env.API_KEY;
    try {
   
        const quoteApi = await axios.get("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json");
        const quoteData = quoteApi.data.quotes;
        const randomNum =Math.floor(Math.random()* quoteData.length)
        const randomQuote =quoteData[randomNum];
        log(randomQuote)

    
        const weatherApi = await axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + city + '&appid=' + apiKey + '&units=metric');
        const data = weatherApi.data;
    
        // log(data)
        const cityArr =data.name;

        log(cityArr)
        res.render('weather', {
            data: data,
            cityAuto:cityArr,
            quotes: randomQuote,
        });

    } catch (err) {
        if (err.response) {
            res.render('error', {
                data: null
            })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.requiest) {
            res.render('error', {
                data: null
            })
            console.log(err.requiest)
        } else {
            res.render('error', {
                data: null
            })
            console.error('Error', err.message)
        }
    }

});



module.exports = weatherRouter;
//Clear
//thunderstorm
//Clouds
//Rain
//Drizzle
//tornado -squall
//mist-fog -haze
//sand-dust
//smoke -ash