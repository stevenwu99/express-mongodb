exports.handlePsqlErrors = (err,req,res,next) => {
    if (err.code === "22P02") {
        res.status(400).send({msg:"Bad request"})
    } else next (err);
 
 };
 
// Changing for Dean version
 exports.handleCustomErrors = (err,req,res,next) => {
    if(err.msg) {
        res.status(err.status).send({msg:err.msg});
    } else 
      if(err.message) {
        res.status(err.status).send({msg:err.message});
      } else next (err);
 };
 
// Changing for Dean version

 /*
 exports.handleCustomErrors = (err,req,res,next) => {
    if(err.msg) {
        res.status(err.status).send({msg:err.msg});
    } else next (err);
 };
*/

 
 exports.handleServerErrors = (err,req,res,next) => {
    res.status(500).send({msg:"Server broken..."});
 };