const express = require('express')
function routeBinder(app){
    app.use('/', require('../routes/user'))
    app.use(express.static('public'))
}

module.exports = routeBinder
