module.exports = function(db,app){
    //Route to delete a single user
    
    app.post('/api/deleteUser',function(req,res){
        
        userID = req.body._id;
        const collection = db.collection('users');
        //Delete a single item based on its unique ID.
        collection.deleteOne({_id:userID},(err,docs)=>{
            res.send({ok:1});
        })
    })
    
    }