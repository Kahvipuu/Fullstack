const User = require('../models/user')

const userList = [
    {
        _id: "603d1a70219a5020b8586c55",
        username: "TopoTesti",
        name: "Pekkatesti",
        passwordHash: "$2b$10$hVSY6.Fr8DExmB9JPB7seeoza5LR8DlfgGSmOwzYUYw53J3YyK7ee",
        __v: 0
    },
    {
        _id: "603d1a70219a5020b8586c56",
        username: "superkoodariTesti",
        name: "koodariNimiTesti",
        passwordHash: "$2b$10$hVSY6.Fr8DExmB9JPB7seeoza5LR8DlfgGSmOwzYUYw53J3YyK7ee",
        __v: 0
    }
]

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {userList, usersInDb}