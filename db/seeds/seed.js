
const db = require('../connection.js');
const  user = require("../userSchema.js");

const seed = ({userData}) => {

    return user.insertMany(userData)
    .then(() => {
        console.log("Insert users ok---->");
     })
     .catch((error) => {
            console.log("insert users Error---->",error)
    })

}


module.exports = seed;

