const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/user-api/login',async (req, res)=> {
    try {
        const user = await User.findByCredentials(req.body.name, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({user, token})
    }catch(e) {
        res.status(400).send(e)
    }
})

router.post('/user-api/logout',auth ,async (req, res)=> {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token != req.token
        })
        await req.user.save();
        res.send();
    }catch(e) {
        res.status(500).send()
    }
})

router.patch('/user-api/password', auth, async (req, res)=> {
    try {
        req.user.password = req.body.password;
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token != req.token
        })
        req.user.save()
        res.send(req.user)
    }catch (e) {
        res.status(401)
    }

})

module.exports = router

