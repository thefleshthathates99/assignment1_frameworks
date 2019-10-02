module.exports = function(db,app){
    //Route to edit a user at _id
  
    app.post('/api/editUser',function(req,res){
      
      
        if (!req.body) {
         return res.sendStatus(400)
        }
        user = req.body;
        editID = user._id;
        editRole = user.status;
        const collection = db.collection('users');
        collection.updateOne({_id: editID},{$set: {status: editRole}},(err,dbres)=>{
      
          if (err) throw err;
          let num = dbres.insertedCount;
          //send back to client number of items instered and no error message
          res.send({'num':num,err:null});
        })
    });
       
    
    }