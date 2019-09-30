module.exports = function(db,app){
    //Route to delete a single item
    
    app.post('/api/updateGroups',function(req,res){
        
        groupID = req.body._id;
        const collection = db.collection('groups');
        //Delete a single item based on its unique ID.
        collection.updateOne({_id:groupID},
            {$set:
                {
                "_id": groupID, 
                "groupName":req.body.groupName,
                "groupAdmin":req.body.groupAdmin,
                "groupAssists":req.body.groupAssists,
                "groupChannels":req.body.groupChannels
                }
            },()=>{
            //Return a response to the client to let them know the delete was successful
             //res.send({'ok':product.objid});
         })
    })
    
}