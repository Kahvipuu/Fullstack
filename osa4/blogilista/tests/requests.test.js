const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./testHelper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.blogList)
})

test('blogs returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('right amount of blogs returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.blogList.length)
})

test('correct form of json', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('blog is added to database', async () => {
    const newBlog = new Blog({
        title: 'BlogAddedToDB',
        author: 'AuthorString',
        url: 'UrlString',
        likes: 1
    })

    const blogsAtStart = await helper.blogsInDb()

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)

})

test('initial default likes zero', async () => {
    let newBlog = new Blog({
        title: 'InitDefaulZeroLikes',
        author: 'AuthorString',
        url: 'UrlString'
    })

    const postedBlog = await api
        .post('/api/blogs/')
        .send(newBlog)
        .expect(200)

    newBlogResponse = await api.get(`/api/blogs/${postedBlog.body.id}`)
    expect(newBlogResponse.body.likes).toBe(0)
})

test('title missing is bad request', async ()=>{
    let newBlog = new Blog({
        author: 'titleMissing',
        url: 'UrlString'
    })

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('url missing is bad request', async ()=>{
    let newBlog = new Blog({
        title: 'UrlMissing',
        author: 'AuthorString',
    })

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

afterAll(() => {
    mongoose.connection.close()
})