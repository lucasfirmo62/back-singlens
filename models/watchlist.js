const mongoose = require('../database');

const watchlistSchema = new mongoose.Schema({
    idUser: {
        type: String
    },
    watchlist:[{
            type: String,
            required: true
    }],
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);

module.exports = Watchlist;