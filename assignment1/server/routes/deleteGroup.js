module.exports = function(db,app){
    //Route to delete a single item
    
    app.post('/api/deleteGroup',function(req,res){
        
        groupID = req.body._id;
        const collection = db.collection('groups');
        //Delete a single item based on its unique ID.
        collection.deleteOne({_id:groupID},(err,docs)=>{
            res.send({ok:1});
        })
    })
    
}