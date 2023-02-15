const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://lucasfirmoup:mortadela4@cluster0.jebmp4v.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
mongoose.Promise = global.Promise;

module.exports = mongoose;