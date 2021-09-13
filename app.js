const express = require('express');
const routes = require('./routes')


const app = express();


publicRoutes = [
    app.use('/business', routes.business)
]



module.exports = app