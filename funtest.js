const db = require('./db/connection.js');
const users = require("./db/userSchema.js")

//Delete an user
const deleteUser = (req,res,next) => {
  const user_name = "tomli9004"  //"tomli2004";

  try {
       const data = users.findOneAndDelete(({username:{$eq:user_name}}))
       const body = JSON.parse(data)
       console.log("user from body------>",body);
       if (!user) {
          console.log("No found the user----->")
          //res.status(404);
          //throw new Error(`User ${username} not found`);
       } else {
         console.log("Deleted user..........",user)
        // res.status(204).send();
       }

  } catch (error) {
        console.log("delete user Error -------->",error)
  }

}

deleteUser();


/*

const userSchema = {
    username: String,
    firstname: String,
    lastname:  String,
 
}

const tables = {users:db.model("users",userSchema)}

const checkExists = (tableName,colName,colValue) => {
    console.log("Tables----->",tables[tableName]);
  return tables[tableName].find({[colName]: colValue})
  .then((rows) => {   
    console.log("Result----->",rows)
        if (rows.length === 0) {
            console.log("Not Found")
       } else {
          console.log("found----->",rows)
       }    
  })

}

checkExists("users","username","tomli2004")
*/