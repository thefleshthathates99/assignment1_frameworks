var fs = require('fs');

module.exports = function(req, res){
    //var dataBeforeSave = req.body.userArray.userList[0].name;
    console.log(req.body);
    let data = JSON.stringify(req.body);
    console.log(data);
    
    fs.writeFileSync('data/users.json', data);
}

