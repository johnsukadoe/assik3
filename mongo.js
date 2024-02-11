const mongoose = require('mongoose');
const uri = "mongodb+srv://miras:qPz8am91@cluster0.urommv6.mongodb.net/weather?retryWrites=true&w=majority";

mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true});

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');

    mongoose.connection.db.admin().command({ ping: 1 }, (err, result) => {
        if (err) {
            console.error('Error pinging MongoDB:', err);
        } else {
            console.log('MongoDB ping successful:', result);
        }
    });
});

const User = mongoose.model('users', { 
    name: String,
    password: String,
    create_time:Number,
    update_time:Number,
    delete_time:Number,
    is_admin:Boolean,
});

const WeatherData = mongoose.model('histories', {
    name: String,
    city: String,
    temperature: Number,
    description: String,
    country:String,
    timezone:Number,
    createdAt:Number,
});
const airquality = mongoose.model('airqualities', {
    name: String,
    city: String,
    air_quality: Object,
    createdAt:Number,
});

const disasters = mongoose.model('disasters', {
    name: String,
    features:Array,
    createdAt:Number,
});

module.exports = {
    User,WeatherData, airquality, disasters
};

