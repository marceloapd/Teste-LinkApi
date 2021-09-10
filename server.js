const app = require('./app')
const config = require('./config/config.json')


app.listen(config.PORT, ()=> console.log(`Server is runing on http://localhost:${config.PORT}/`))