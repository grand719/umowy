const User = require('../models/user')
const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/admin-api/createuser',auth ,async (req, res)=> {

    const user = new User(req.body)
    try {
        if(req.user.name != "admin") {
            throw new Error('Only admin can add a user')
        }
        await user.save()
        res.status(201).send(user)
    }catch(e) {
        res.status(400).send(e)
    }
})

router.patch('/admin-api/updateuser/:id', auth, async (req, res)=> {
    const userId = req.params.id;

    try {
        if(req.user.name != 'admin') {
            throw new Error('Wrong user')
        }
       const user = await User.findById(userId)
       user.name = req.body.name
       user.password = req.body.password
       user.save()
       res.status(200).send('Password changed')
    }catch(e) {
        res.status(423).send(e)
    }
})

router.delete('/admin-api/deletuser/:id',auth ,async (req, res)=> {
    const _id = req.params.id

    try {
        if(_id === req.user._id) {
            throw new Error(`you can't delete this account`)
        }
        if(req.user.name != 'admin') {
            throw new Error('Wrong user')
        }
        await User.deleteOne({_id: _id})
        res.status(200).send(`User deleted: ${_id}`)
    }catch(e) {
        res.send(e)
    }
})

router.get('/admin-api/getusers', auth, async (req, res)=> {

    try {
        if(req.user.name != 'admin') {
            throw new Error('Wrong user')
        }

    const users = await User.find({})

    res.status(200).send(users)
        
    }catch(e) {
        res.status(400).send(e)
    }

})

module.exports = router