const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (request, response) => {
    //jostain hyvästä syystä REST clientin request ilman ._doc ja muuten täytyy olla
    const body = request.body._doc
    console.log('MOLOLOLOLOLOLO USER POSt', body);

    if (body.username && body.password && body.name) {
        if (body.password.length < 3) {
            response.status(400).json({ error: 'password must be atleast 3 characters' })
        }
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })
        const savedUser = await user.save()
        response.json(savedUser)
    } else {
        response.status(400).json({ error: 'username, name and password are all required' })
    }

})

// middleWare virheenkäsittely tuloillaan...

module.exports = usersRouter
