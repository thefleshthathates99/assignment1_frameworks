module.exports = function(db,app,ObjectID){
    //Route to get a single item
    
    app.post('/api/getitem',function(req,res){
      
      
        if (!req.body) {
         return res.sendStatus(400)
        }
        
        productID = req.body.productid;
        //Create objectID from passed in+id
        var objectid = new ObjectID(productID);
        const collection = db.collection('products');
        collection.find({_id:objectid}).limit(1).toArray((err,docs)=>{
            //send to client and array of items limited to 1.
            console.log(docs);
              res.send(docs);
            })
         
        })
    
    }