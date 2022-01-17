const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

module.exports = {
    cookie: {
        secret: process.env.TOKEN_SECRET,
        maxAge: 120000
    }
}