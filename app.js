const express = require("express");
const app = express();

app.use(express.json());

const {handlePsqlErrors,handleCustomErrors,handleServerErrors} = require('./error');
const {getUserByUserName,addUser,deleteUser} = require('./controller/app.controller');


app.get('/api/users/:username',getUserByUserName)

app.post('/api/users',addUser)

app.delete('/api/users/:username',deleteUser)


//Error handle
app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app; 