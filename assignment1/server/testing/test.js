var assert = require('assert');
var app = require('../server');
var http = require('http');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = require('chai').should();
// const should = require('should');
chai.use(chaiHttp);

describe('Server Testing', function(){
    before(function() {
        console.log("Pre-Test Statement");
    })

    after(function() {
        console.log("Post-Test Statement");
        done();
    })

    describe('Data Loads', function(){
        it("Should return data from the User's route", function(){
            chai.request(app)
                .get('/api/getUsers')
                .end((err, res) => {
                    res.should.have.status(200);
                    console.log(res.body);

                })
        })
        it("Should return data in the form of an Array from the User's route", function(){
            chai.request(app)
                .get('/api/getUsers')
                .end((err, res) => {
                    res.body.should.be.a('array');
                    res.body.should.have.property('_id');
    
                })
        })
        it("Should return data from the Group's route", function(){
            chai.request(app)
                .get('/api/getGroups')
                .end((err, res) => {
                    res.should.have.status(200);
                    console.log(res.body);

                })
        })
        it("Should return data in the form of an Array from the Group's route", function(){
            chai.request(app)
                .get('/api/getGroups')
                .end((err, res) => {
                    res.body.should.be.a('array');
                    res.body.should.have.property('_id');
    
                })
        })
    })
    describe('Insert new User', function(){
        it("Should insert User Dummy data", function(){
            chai.request(app)
                .post('/api/addNewUser')
                .type('form')
                .send({"_id":99,"name":"Dummy","username":"dummy@gmail.com","password":"dummy","status":"super"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.have.property('_id');
    
                })
        })
    })
    describe('Insert new Group', function(){
        it("Should insert Group Dummy data", function(){
            chai.request(app)
                .post('/api/addNewGroup')
                .type('form')
                .send(
                    {
                    "_id": 99, 
                    "groupName":"Dummy Group Name",
                    "groupAdmin":"Dummy Admin",
                    "groupAssists":["Dummy Assists"],
                    "groupChannels":[
                    {
                        "ChannelName":"Dummy Channel",
                        "ChannelUsers":["Dummy User"], 
                        "ChannelChat": []
                    }
                    ]
                }
                )
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.have.property('_id');
    
                })
        })
    })
    describe('Delete a User', function(){
        it("Should insert User Dummy data, then delete it", function(){
            chai.request(app)
                .post('/api/addNewUser')
                .type('form')
                .send({"_id":98,"name":"Dummy","username":"dummy@gmail.com","password":"dummy","status":"super"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.have.property('_id');
    
                })
            chai.request(app)
                .post('/api/deleteUser')
                .type('form')
                .send({"_id":98})
                .end((err, res) => {
                    res.should.have.status(404);
    
                })
        })
    })
    describe('Delete a Group', function(){
        it("Should insert Group Dummy data, then delete it", function(){
            chai.request(app)
                .post('/api/addNewGroup')
                .type('form')
                .send(
                    {
                    "_id": 98, 
                    "groupName":"Dummy Group Name",
                    "groupAdmin":"Dummy Admin",
                    "groupAssists":["Dummy Assists"],
                    "groupChannels":[
                    {
                        "ChannelName":"Dummy Channel",
                        "ChannelUsers":["Dummy User"], 
                        "ChannelChat": []
                    }
                    ]
                }
                )
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.have.property('_id');
    
                })
            chai.request(app)
                .post('/api/deleteGroup')
                .type('form')
                .send({"_id":98})
                .end((err, res) => {
                    res.should.have.status(404);
    
                })
        })
    })
    describe('Insert new users into Channel', function(){
        it("Should insert Channel User Dummy data", function(){
            chai.request(app)
                .post('/api/addNewUsertoChannel')
                .type('form')
                .send(
                    {
                    "_id": 101, 
                    "groupName":"Dummy Group Name",
                    "groupAdmin":"Dummy Admin",
                    "groupAssists":["Dummy Assists"],
                    "groupChannels":[
                    {
                        "ChannelName":"Dummy Channel",
                        "ChannelUsers":["Dummy User", "Additional Dummy User"], 
                        "ChannelChat": []
                    }
                    ]
                }
                )
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.have.property('_id');
    
                })
        })
    })
    describe('Updates Group Data', function(){
        it("Changes any part of the Group Data, this route is specifically for editing", function(){
            chai.request(app)
                .post('/api/updateGroups')
                .type('form')
                .send(
                    {
                    "_id": 100, 
                    "groupName":"Edited Group Name",
                    "groupAdmin":"Edited Admin",
                    "groupAssists":["Edited Assists"],
                    "groupChannels":[
                    {
                        "ChannelName":"Edited Channel",
                        "ChannelUsers":["Edited User", "Additional Edited User"], 
                        "ChannelChat": []
                    }
                    ]
                }
                )
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.have.property('_id');
    
                })
        })
    })

})
