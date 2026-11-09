const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://lucasfirmo70022102_db_user:CoZRdw4MAxxGhnMf@cluster0.xtq6aho.mongodb.net/',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
mongoose.Promise = global.Promise;

module.exports = mongoose;
