const devData = require('../data/development-data/index');
const seed = require('./seed.js');
const db = require('../connection.js');

const runSeed = () => {
    return seed(devData)
    .then(() => {
        console.log("Run Seed completed....")
    })
    .catch((error) => {
        console.log("Run Seed Error----->",error)
    })
    .finally(() => {
        db.connection.close()
    })
  };
  

runSeed();

