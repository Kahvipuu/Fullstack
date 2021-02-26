const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})

    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
    console.log('GET XXXXXXXXXXXXXXXXXXXXXXXXX ID', request.params.id);
    const blog = await Blog.findById(request.params.id)
    console.log('GET2 DDDDD', blog);
    if (blog) {
        response.json(blog.toJSON())
    } else {
        response.status(404).end()
    }

})

blogsRouter.post('/', async (request, response) => {
    const body = request.body._doc
    const likes = request.body._doc.likes === undefined ? 0 : body.likes
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: likes
    })
    console.log('BLOG TO SAVE hilisdsd ->', blog);
    await blog.save()

    response.json(blog.toJSON())
})

module.exports = blogsRouter