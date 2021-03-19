const mongoose = require('mongoose')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

logger.info('mongoURL', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(logger.info('conn ok'))
    .catch((err) => {
        logger.error('error', err)
    })

app.use(cors())
app.use(express.json())
/*
const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    } else {
        request.token = null
    }
    next()
}
app.use(tokenExtractor)
*/
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (config.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
  }

// olisi toki kauniimpaa erottaa middlewaret omaan moduliinsa
const errorHandler = (error, request, response, next) => {
    console.error('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxx error', error.message)

    if (error.name === 'JsonWebTokenError') {
        return response.status(400).send({ error: 'jwt must be provided' })
    }

    next(error)
}
app.use(errorHandler)

module.exports = app