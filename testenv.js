//const ENV = process.env.NODE_ENV || 'development';

const ENV = process.env.NODE_ENV || 'production';

console.log ("---->",ENV)
console.log(`${__dirname}`)

require('dotenv').config({
  path: `${__dirname}/.env.${ENV}`,
});

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL not set');
} 

const {DATABASE_URL} = process.env;

console.log(DATABASE_URL)