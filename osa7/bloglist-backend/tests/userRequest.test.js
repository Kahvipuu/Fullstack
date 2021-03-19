const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./userTestHelper')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.userList)
})

test('username missing is bad request', async () => {
    let newUser = new User({
        name: 'usernameMissing',
        password: 'salasana'
    })

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
})

test('name missing is bad request', async () => {
    let newUser = new User({
        username: 'nameMissing',
        salasana: 'salasana'
    })

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
})

test('password missing is bad request', async () => {
    let newUser = new User({
        username: 'passwordMissing',
        name: 'testName',
    })

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
})

test('password too short is bad request', async () => {
    let newUser = new User({
        username: 'shortPassword',
        name: 'testName',
        password: 'pw'
    })

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
})

test('no duplicate usernames are created', async () => {
    let newUser = new User({
        username: 'TopoTesti',
        name: 'testUsernameDuplicate',
        password: 'password'
    })

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
})

afterAll(() => {
    mongoose.connection.close()
})