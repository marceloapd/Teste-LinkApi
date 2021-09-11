const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


mongoose.connect('mongodb+srv://linkApi:yRA6ToufoC3dp5us@cluster0.gilpn.mongodb.net/linkApi?retryWrites=true&w=majority').then(()=>{
    console.log('Database Connected')
}).catch(err=>{
    console.log('Database not Connected '+err)
})


module.exports = mongoose;
