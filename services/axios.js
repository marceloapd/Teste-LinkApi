const axios = require('axios')
const config = require('../config/config.json')


module.exports = {
    
    pipeDrive: new axios.create({
        baseURL: config.PIPEDRIVE.base_url,
        params: {
            api_token: config.PIPEDRIVE.api_token
        }
    }),

    bling: new axios.create({
        baseURL: config.BLING.base_url,
        params: {
            apikey: config.BLING.api_token
        },
        headers: { 
            'content-type': 'application/x-www-form-urlencoded' 
        }

    })

}