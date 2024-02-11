const {User, WeatherData} = require("./mongo");

const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'cookie', resave: true, saveUninitialized: true}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.post('/login', async (req, res)=>{
    console.log(req.body);
    const {name, password} = req.body;

    const user = await User.findOne({name, password});
    console.log(user);
    if (user) {
        req.session.name = name;
        res.redirect('/main');
    } else {
        res.send('Invalid login credentials');
    }
} );

app.post('/signin', async (req, res) =>{
    const {name, password} = req.body;

    const create_time = Date.now();
    const update_time = 0;
    const delete_time = 0;
    const is_admin = false;
    await User.create({name, password, create_time, update_time, delete_time, is_admin});

    req.session.name = name;
    res.redirect('/main');
})

app.post('/search', async (req, res) =>{
    console.log(req);
    const {city} = req.body;

    const apiKey = '394f7ad19bb5c5525c4ddb18324358d7';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        const weatherData = response.data;
        const {name} = req.session;
        const createdAt = Date.now()
        await WeatherData.create({
            name,
            city,
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description,
            country:weatherData.sys.country,
            timezone:weatherData.timezone,
            createdAt
        });

        res.session.name = name;
        res.session.createdAt = createdAt;
        res.redirect('/main');
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.send('Failed to fetch weather data.');
    }
})


app.get('/login', (req, res) => {
    res.render('login');
});


app.get('/signin', (req, res) => {
    res.render('signin');
});

app.get('/', (req, res) => {
    res.redirect('/login');
})

app.get('/main', async (req, res) =>{
    console.log(req.session);
    const {name, createdAt} = req.session;
    const latestWeatherData = await WeatherData.findOne({ name }).sort({ createdAt: -1 });

    res.render('index', {name, latestWeatherData});
})

app.get('/air-quality', async (req, res) => {
    const {name, createdAt, city} = req.session;
    const latestWeatherData = await WeatherData.findOne({ name }).sort({ createdAt: -1 });

    const apiKey = "1mAakESykRxpQRG/SXJW0Q==Hu2qwg2bn88cyiom";
    axios.get(`https://api.api-ninjas.com/v1/airquality?city=${latestWeatherData.city}`, {
    headers: {
        'X-Api-Key': apiKey
    }
    })
    .then(response => {
        const air = response.data;

        res.render('air-quality', {name, latestWeatherData, air});
    })
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});