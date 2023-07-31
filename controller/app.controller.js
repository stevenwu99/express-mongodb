const {selectUserByUserName,AddNewUser} = require('../model/app.model')
const asyncHandler = require("express-async-handler"); // https://www.npmjs.com/package/express-async-handler

const users = require("../db/userSchema.js")

//Search by username

/*
exports.getUserByUserName = (req,res,next) => {
      const userName  = req.params.username;
      selectUserByUserName (userName)
      .then ((user) => {
        res.status(200).send({user:user})
      })
      .catch (next)
}
*/

exports.getUserByUserName = asyncHandler(async (req, res) => {
   const userName  = req.params.username;  
   try {
      const user = await users.find({ username: userName})
      if (user.length === 0) {
         throw new Error('Not found');
      } 
        res.status(200).send({user:user[0]})
   } catch (err) {
      err.status = 404
      throw err
   }
     
}); 

//---------------------------------------Add a new user-----------------------------------------
/*
exports.addUser = (req,res,next) => {
     const new_user = req.body;

    if (!new_user.username || !new_user.firstname || !new_user.lastname) {
       return Promise.reject({status:422,msg:'Unprocessable Entity'})
       .catch(next)
    }

    users.exists({username:new_user.username})
     .then((checkExit) => {   
        if (checkExit) {
            return Promise.reject({status:404,msg:'User exist already'})
            .catch(next)        
        }  
      })
     .then (() => {
        return  AddNewUser(new_user)
      })
      .then ((user) => {
         res.status(201).send({user:user})
      })
     .catch(next)
}
*/
exports.addUser = asyncHandler(async (req, res,next) => {
   try {
      const new_user = req.body;
      if (!new_user.username || !new_user.firstname || !new_user.lastname) {
         return Promise.reject({status:422,msg:'Unprocessable Entity'})
         .catch(next)
      }
       const userCheck = await users.exists({username:new_user.username})
      if (userCheck) {
          return Promise.reject({status:404,msg:'User exist already'})   
          .catch(next) 
      }    
      const user = await AddNewUser(new_user)
      res.status(201).send({user:user})
   } catch (next) {}
 });


//---------------------------------Delete an user----------------------------------------------
/*
exports.deleteUser = asyncHandler(async (req, res) => {
   try {
     const username = req.params.username;
     const user = await users.findOneAndDelete(({username: {$eq:username}}))
     if (!user) {
       //res.status(404);
       throw new Error(`User ${username} not found`);
     }
     res.status(204).json(user);
   } catch (err) {
     //throw new Error(err.message);
      err.status = 404
      throw err
   }
 });
*/

exports.deleteUser = (req,res,next) => {
  const username  = req.params.username;
  users.findOneAndDelete(({username: {$eq:username}}))
  .then ((user) => {
     if (!user) {
        return Promise.reject({status:404,msg:`User ${username} not found`})    
     }
     res.status(204).send();
  })
  .catch (next);
}



