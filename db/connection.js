const mongoose = require("mongoose")

const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL not set');
} 

const {DATABASE_URL} = process.env;

mongoose.connect(DATABASE_URL,{ dbName: 'testdb',useNewUrlParser: true, useUnifiedTopology: true })
.catch((err) => { console.error(err); });


module.exports = mongoose;

