const express = require('express')
const authMiddleware = require('../middlewares/auth');

const Watchlist = require('../models/watchlist')


const router = express.Router();

router.use(authMiddleware);


router.get('/', async (req, res) => {
    res.send({ ok: true, user: req.userId })
});

router.post('/', async (req, res) => {

        res.send({ watchlist:[{ type: String, required: true }], }.create(req.body))

    })

router.delete('/', async (req, res) => {
    res.send({ ok: true, user: req.userId })
})

module.exports = app => app.use('/user', router);