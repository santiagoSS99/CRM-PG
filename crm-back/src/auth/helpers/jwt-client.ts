require('dotenv').config()

var jwt = require('jwt-simple')
var moment = require('moment')
var secret = process.env.JWT_SECRET

export function createToken(customer) {
    var payload = {
        id: customer.id,
        names: customer.name,
        surnames: customer.surnames,
        t_number: customer.t_number,
        email: customer.email,
        type: customer.type,
        verify: customer.verify,
        iat: moment().unix(), // Fecha de emisión del token (en segundos)
        exp: moment().add(100, 'day').unix(), // Fecha de expiración del token (en segundos)
    }

    return jwt.encode(payload, secret)
}