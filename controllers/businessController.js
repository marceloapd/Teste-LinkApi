const service = require('../services')

module.exports = {
    async seedBling(req, res, next){
        try{
            let result = await service.business.seedBling()
            res.status(200).json({result})
        } catch (error){
            return next(error)
        }
    },

    async getBling(req,res,next){
        try{
            let result = await service.business.getAllBling()
            res.status(200).json({result})
        } catch (error){
            return next(error)
        }
    }
}