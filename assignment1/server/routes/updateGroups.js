module.exports = function(db,app){
    //Route to update the groups Database. Called everytime an edit is made to the groups from Angular
    
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