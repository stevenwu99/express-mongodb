const db = require('../db/connection.js');
const users = require("../db/userSchema.js")

//Check exists


//Search by username
exports.selectUserByUserName = (userName) => {
    return users.find({ username: userName})
    .then((rows) => {   
          if (rows.length === 0) {
           return Promise.reject({status:404,msg:'Not found'})
         }
         return rows;
    })
}

//Add a new user

exports.AddNewUser = (new_user) => {
  newUser = new users (new_user);
  return newUser.save()
  .then((rows) => {
      return rows;
  })
}


