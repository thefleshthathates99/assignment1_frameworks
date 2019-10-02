module.exports = function(db,app){
    //Route to get list of all groups in the Database.
    
    app.get('/api/getGroups',function(req,res){
      
        const collection = db.collection('groups');
        collection.find({}).toArray((err,data)=>{
            
           res.send(data);
       })
    })
}       
        
       
       
    
  