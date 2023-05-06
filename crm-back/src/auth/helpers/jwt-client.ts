require('dotenv').config()

var jwt = require('jwt-simple')
var moment = require('moment')
var secret = process.env.JWT_SECRET
// JWT_SECRET=S@n714g01999

exports.createToken = function (customer) {
    var payload = {
        names: customer.name,
        surnames: customer.surnames,
        t_number: customer.t_number,
        email: customer.email,
        type: customer.type,
    }

    return jwt.encode(payload, secret)
}