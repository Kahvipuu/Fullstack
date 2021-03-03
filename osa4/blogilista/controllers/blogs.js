const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1 })

    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog.toJSON())
    } else {
        response.status(404).end()
    }

})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body._doc //VScoden rest clientoiin vain request.body  (._doc pois)
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        _id: request.params.id
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    console.log('PUT upDATED nönönön SDFGDSFGDSFGHJGFD', updatedBlog);
    response.json(updatedBlog.toJSON())
})

blogsRouter.post('/', async (request, response) => {
    //jostain hyvästä syystä REST clientin request ilman ._doc ja muuten täytyy olla
    const body = request.body//._doc
    if (body.title && body.url) {
        const user = await User.findOne({})
        const likes = body.likes === undefined ? 0 : body.likes
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: likes,
            user: user._id
        })
        console.log('PÖPÖPÖPÖPÖPÖPÖPÖPÖPÖPÖPÖPÖPÖPÖ POST', blog);
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(savedBlog.toJSON())
    } else {
        response.status(400).end()
    }

})

module.exports = blogsRouter