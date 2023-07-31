const db = require("./connection.js");

const userSchema = {
    username: String,
    firstname: String,
    lastname:  String,
}

const users = db.model("users",userSchema)
//const user = db.model("users", db.Schema (userSchema));

module.exports = users;

