const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const usersSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    avatar:{
        type: String,
    },
    watchlist:[{
        type: String,
    }],
    following:[{
        type: String,
    }],
    followers:[{
        type: String,
    }],
    cineWatch:{
        cineWatchState:{
            type: String,
        },
        cineWatchTime:{
            type: String,
        },
        cineWatchMovieId:{
            type: String,
        },
    },
    cineWatchMovieId:{
        type: String,
    },
    resume:[{
        idMovie:{
            type: String,
        },
        currentTimeMovie:{
            type: String,
        },
        timeMovie:{
            type: String,
        },
    }],
    createDATE:{
        type: Date,
        default: Date.now
    }
});

usersSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash

    next();
})

const User = mongoose.model('User', usersSchema);

module.exports = User;
