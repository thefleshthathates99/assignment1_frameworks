module.exports = function(db,app){
    //Route to get list of all users in the Database.
    
    app.get('/api/getUsers',function(req,res){
      
        const collection = db.collection('users');
        collection.find({}).toArray((err,data)=>{
            
           res.send(data);
       })
    })
}       
        
       
       
    
  