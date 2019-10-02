module.exports = function(db,app){
    //Route to add User to Channel
  
    app.post('/api/addNewUsertoChannel',function(req,res){
      
      
        if (!req.body) {
         return res.sendStatus(400)
        }
        group = req.body;
        editID = group._id;
        editChannelUsers = group.groupChannels;
        const collection = db.collection('users');
        //Still need to work on
        collection.updateOne({_id: editID},{$set: {groupChannels: editChannelUsers}},(err,dbres)=>{
      
          if (err) throw err;
          let num = dbres.insertedCount;
          //send back to client number of items instered and no error message
          res.send({'num':num,err:null});
        })
    });
       
    
    }