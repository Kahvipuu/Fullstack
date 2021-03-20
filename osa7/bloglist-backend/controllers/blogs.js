const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')

// ei enää käytössä... ja taas käytössä.. kopiointi osasta 4 osaan 5, toivottavasti ei hajonnut osasta 4 mitään välissä...
const getTokenFrom = request => {
    const authorization = request.get('Authorization')
    return authorization
    /*
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null */
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1 })

    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id).populate('user', { username: 1 })
    if (blog) {
        response.json(blog.toJSON())
    } else {
        response.status(404).end()
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    const token = getTokenFrom(request)
    const verifiedToken = jwt.verify(token, config.SECRET)
    if (!token || !verifiedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    if (verifiedToken.id === blog.user.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } else {
        response.status(401).json({ error: 'user not matching blog creator' })
    }
})

blogsRouter.put('/:id', async (request, response) => {
    console.log('put blog', request.body)
    const body = request.body//._doc //VScoden rest clientoiin vain request.body  (._doc pois)
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        _id: request.params.id
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    console.log('PUT upDATED nönönön SDFGDSFGDSFGHJGFD', updatedBlog)
    response.json(updatedBlog.toJSON())
})

blogsRouter.post('/', async (request, response) => {
    console.log('post blog', request.body)
    //jostain hyvästä syystä REST clientin request ilman ._doc ja muuten täytyy olla
    //jossain jotain outoa toiminnallisuutta.. osa5 front toimii suoraan req.bodyllä
    const body = request.body//._doc
    const token = getTokenFrom(request)
    const verifiedToken = jwt.verify(token, config.SECRET) //unhandled promise rejection jos ei ole tokenia, korjataan jos on tehtävänä...
    if (!token || !verifiedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    if (body.title && body.url) {
        const user = await User.findById(verifiedToken.id)
        console.log('user in blog post', user)
        const likes = body.likes === undefined ? 0 : body.likes
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: likes,
            user: user._id
        })
        console.log('PÖPÖPÖPÖPÖPÖPÖPÖPÖPÖPÖPÖPÖPÖPÖ POST', blog)
        // jos innostusta löytyy niin uuden blogin lisäämisen 
        // yhteydessä pitäsi tehdä -> .populate('user', {username: 1})
        // ilmeisesti...
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(savedBlog.toJSON())
    } else {
        response.status(400).end()
    }

})

module.exports = blogsRouter