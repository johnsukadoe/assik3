const {User, WeatherData, airquality, disasters} = require("./mongo");

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
    const {name, password} = req.body;

    const user = await User.findOne({name, password});
    console.log(user);
    if (user) {
        req.session.name = name;
        req.session.is_admin = user.is_admin;
        req.session.created_time = user.create_time;
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
    req.session.is_admin = is_admin;
    req.session.created_time = create_time;
    res.redirect('/main');
})

app.post('/search', async (req, res) =>{
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
    const {name, is_admin} = req.session;
    let latestWeatherData = await WeatherData.findOne({ name }).sort({ createdAt: -1 });
    if(!latestWeatherData){
        latestWeatherData = {};
    }else{
        req.session.city = latestWeatherData.city;
    }
    res.render('index', {name, latestWeatherData, is_admin})
})

app.get('/air-quality', async (req, res) => {
    const {name, city, is_admin} = req.session;
    let air= {}

    const apiKey = "1mAakESykRxpQRG/SXJW0Q==Hu2qwg2bn88cyiom";
    await axios.get(`https://api.api-ninjas.com/v1/airquality?city=${city}`, {
    headers: {
        'X-Api-Key': apiKey
    }
    })
    .then(response => {
        air = response.data;
    })
    await airquality.create({
        name, 
        city,
        air_quality:{...air},
        createdAt: Date.now()
    })
    res.render('air-quality', {city, name, air, is_admin});
});
app.get('/disasters', async (req, res) =>{
    const {name, is_admin} = req.session;
    let features = [];
    await axios.get(`https://www.gdacs.org/gdacsapi/api/events/geteventlist/ARCHIVE`)
    .then(response => {
        for(let i = 0; i<response.data.features.length; i++){
            let object = {
                event_name: response.data.features[i].properties.name,
                description: response.data.features[i].properties.htmldescription,
                alertLevel: response.data.features[i].properties.alertLevel,
                country:response.data.features[i].properties.country
            }
            features.push(object);
        }
    })
    await disasters.create({
        name, 
        features,
        createdAt: Date.now()
    })

    let disastersData = await disasters.find().limit(1);
    console.log(disastersData, 'something');
    res.render('disasters', {disastersData, is_admin});
})


app.get('/history', async (req, res) =>{
    const {name, is_admin} = req.session;

    let historyData = await WeatherData.find({name});
    res.render('history', {historyData, is_admin});
})

app.get('/users', async (req, res) =>{
    const {name, is_admin} = req.session;

    let users = await User.find();
    res.render('users', {users, is_admin});
})


app.get('/users/delete/:create_time', async (req, res) =>{
    const {name, is_admin, created_time} = req.session;
    const create_time = req.params.create_time;
    if(create_time == created_time){
        res.redirect('/users');
    }else{
        try {
            await User.deleteOne({ create_time: create_time });
    
            res.redirect('/users'); 
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).send('Internal Server Error'); 
        }
    }
})


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});