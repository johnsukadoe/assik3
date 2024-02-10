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

const User = mongoose.model('users', { name: String, password: String });

module.exports = {
    User,
};