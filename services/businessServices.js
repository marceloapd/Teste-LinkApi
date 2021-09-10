const axios = require('./axios')

module.exports = {
    async seedBling(){
        const result = await axios.pipeDrive.get('deals?status=won')
        return result.data
    }       
}