const axios = require('axios')
const config = require('../config/config.json')


module.exports = {
    
    pipeDrive: new axios.create({
        baseURL: config.PIPEDRIVE.base_url,
        params: {
            api_token: config.PIPEDRIVE.api_token
        }
    })

}