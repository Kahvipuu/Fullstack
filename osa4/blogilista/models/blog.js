const mongoose = require('mongoose')
const config = require('../utils/config')
const logger = require('../utils/logger')

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

module.exports = mongoose.model('Blog', blogSchema)

