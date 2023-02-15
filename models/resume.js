const mongoose = require('../database');

const ResumeSchema = new mongoose.Schema({
    resume:[{
        idMovie:{
            type: String,
        },
        currentTimeMovie:{
            type: String,
        },
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
});

const Resume = mongoose.model('Resume', ResumeSchema);

module.exports = Resume;