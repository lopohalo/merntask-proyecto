const moongose = require('mongoose')
require('dotenv').config({ path: 'variables.env'});

const conectarDB = async () => {
    try {
      await moongose.connect(process.env.DB_MONG, {
        
       useNewUrlParser: true,
       useUnifiedTopology: true,
       useFindAndModify: false
      })
      console.log('DB conectada')
    } catch (error) {
      console.log(error)
      process.exit(1);
    }
}

module.exports = conectarDB;