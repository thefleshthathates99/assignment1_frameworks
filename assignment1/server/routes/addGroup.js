module.exports = function(db,app){
    //Route to add a Group to DB
  
    app.post('/api/addNewGroup',function(req,res){
      
      
        if (!req.body) {
         return res.sendStatus(400)
        }
        group = req.body;
        const collection = db.collection('groups');
        collection.insertOne(group,(err,dbres)=>{
      
          if (err) throw err;
          let num = dbres.insertedCount;
          //send back to client number of items instered and no error message
          res.send({'num':num,err:null});
        })
    });
       
    
    }