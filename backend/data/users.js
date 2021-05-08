const bcrypt = require('bcryptjs')

const users = [
    {
        name: 'Hamdi Ahmed',
        email: 'hamdi@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Raghda Mohamed',
        email: 'Raghda@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Ahmed Hamdi',
        email: 'Ahmed@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

module.exports = users