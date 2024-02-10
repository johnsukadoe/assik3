const {User} = require("./mongo");

const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');

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

app.post('/register', async (req, res) =>{
    const {name, password} = req.body;

    await User.create({name, password});

    req.session.name = name;
    res.redirect('/main');
})



app.get('/login', (req, res) => {
    res.render('login');
});


app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/', (req, res) => {
    res.redirect('/login');
})


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});