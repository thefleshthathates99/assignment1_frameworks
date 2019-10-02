module.exports = function(db,app){
    //Route that adds data to the mongoDB. Personal use by admin
    
    app.get('/api/addData',function(req,res){
      
        const collection = db.collection('users');
        const nextCollection = db.collection('groups');
        var dummyData1 = [
                {"_id":1,"name":"Zane","username":"zane@gmail.com","password":"zane","status":"super"},
                {"_id":2,"name":"Minami","username":"minami@gmail.com","password":"bestgirl","status":"group admin"},
                {"_id":3,"name":"Ochako","username":"uravity@gmail.com","password":"float","status":"group admin"},
                {"_id":4,"name":"derrick","username":"derrick@gmail.com","password":"derrick","status":"super"},
                {"_id":5,"name":"Rick","username":"rick@gmail.com","password":"rick","status":"user"},
                {"_id":6,"name":"Allen","username":"allen@gmail.com","password":"allen","status":"user"},
                {"_id":7,"name":"Greg","username":"greg@gmail.com","password":"greg","status":"user"},
                {"_id":8,"name":"Elma","username":"elma@gmail.com","password":"elma","status":"group assist"},
                {"_id":9,"name":"Coke","username":"coke@gmail.com","password":"coke","status":"user"},
                {"_id":10,"name":"Powerade","username":"powerade@gmail.com","password":"powerade","status":"user"},
                {"_id":11,"name":"Razer","username":"razer@gmail.com","password":"razer","status":"user"},
                {"_id":12,"name":"Zero Two","username":"zerotwo@gmail.com","password":"zerotwo","status":"group assist"},
                {"_id":13,"name":"C.C.","username":"cc@gmail.com","password":"cc","status":"group assist"},
                {"_id":14,"name":"Menma","username":"menma@gmail.com","password":"menma","status":"group assist"}
        ]


       var dummyData2 = [
            {"_id": 1, "groupName":"1st Lab on Fridays","groupAdmin":"Minami","groupAssists":["Elma","Menma"],
              "groupChannels":[
                {"ChannelName":"Channel 9","ChannelUsers":["Zane","Allen","derrick","Greg"], "ChannelChat": []}
              ]},
            {"_id": 2,"groupName":"The things I see around my desk","groupAdmin":"Zane","groupAssists":["Zero-Two","C.C.","Menma","Zero Two"],
              "groupChannels":[
                {"ChannelName":"Channel Crunchryoll","ChannelUsers":["Coke","Powerade","derrick","Razer","Zane","Ochako"], "ChannelChat": []},
                {"ChannelName":"New Channel","ChannelUsers":[],"ChannelChat": []},
                {"ChannelName":"EEEEE","ChannelUsers":[],"ChannelChat": []},
                {"ChannelName":"REEEE","ChannelUsers":[],"ChannelChat": []}
              ]},
            {"_id": 3,"groupName":"The Great Meme Army","groupAdmin":"Zane","groupAssists":[],
              "groupChannels":[
                {"ChannelName":"","ChannelUsers":[], "ChannelChat": []},
                {"ChannelName":"REEEEEEE","ChannelUsers":[], "ChannelChat": []}
              ]}
        ]

        collection.insertMany(dummyData1,(err,dbres)=>{
    
          if (err) throw err;
          let num = dbres.insertedCount;
          //send back to client number of items instered and no error message
          
          collection.find({}).toArray((err,data)=>{
              
            res.send({'num':num,err:null, data});
        })
        })
        nextCollection.insertMany(dummyData2,(err,dbres)=>{
    
          if (err) throw err;
          let num = dbres.insertedCount;
          //send back to client number of items instered and no error message
          
          nextCollection.find({}).toArray((err,data)=>{
              
            res.send({'num':num,err:null, data});
        })
        })
    });
       
    
    }