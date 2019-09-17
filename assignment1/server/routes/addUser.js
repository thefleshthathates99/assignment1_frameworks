module.exports = function(db,app){
    //Route to manage adding a product
  
    app.post('/api/addNewUser',function(req,res){
      
      
        if (!req.body) {
         return res.sendStatus(400)
        }
        user = req.body;
        const collection = db.collection('users');
        collection.insertOne(user,(err,dbres)=>{
      
          if (err) throw err;
          let num = dbres.insertedCount;
          //send back to client number of items instered and no error message
          res.send({'num':num,err:null});
        })
    });
       
    
    }