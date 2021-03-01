const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})

    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    console.log('GET2 DDDDD', blog);
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

blogsRouter.put('/:id', async(request, response)=>{
    console.log('PUT SDFGDSFGDSFGHJGFD', request.body);
    console.log('req params ID asddasadsdas', request.params.id);
    const body = request.body._doc //VScoden rest clientoiin vain request.body  (._doc pois)
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        _id: request.params.id
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    console.log('PUT upDATED nönönön SDFGDSFGDSFGHJGFD', updatedBlog);
    response.json(updatedBlog.toJSON())
})

blogsRouter.post('/', async (request, response) => {
    //jostain hyvästä syystä REST clientin request ilman ._doc ja muuten täytyy olla
    const body = request.body._doc
    if (body.title && body.url) {
        const likes = body.likes === undefined ? 0 : body.likes
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: likes
        })
        await blog.save()
        response.json(blog.toJSON())
    } else {
        response.status(400).end()
    }

})

module.exports = blogsRouter