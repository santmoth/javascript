const express = require('express');
const app = express();
const nodemon = require('nodemon');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const route = express.Router()
const { NAME, DB_USERNAME, DB_PASSWORD } = process.env;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.m7yxz.gcp.mongodb.net/sample?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });
(async () => {
    const connections = await client.connect()
    const dbo = connections.db("sample");
    const user = {};
    app.post('/users', (req, res) => {
        const { firstName, lastName, userName, password, age } = req.body;

        user.firstName = firstName;
        user.lastName = lastName;
        user.userName = userName;
        user.password = password;
        user.age = age;
        // dbo.createCollection("user");
        dbo.collection("user").findOne({ userName: user.userName}, (err, userWrite) => {
            if (userWrite == null) {
                dbo.collection("user").insertOne(user);
                res.json(user);
            }else{
                res.send ("the user name is already taken");
            }
        })

    });


    app.get('/users', async (req, res) => {
        const users = await dbo.collection('user').find().toArray();
        res.send({'status': true, 'message': 'sucessfully deleted', 'status_code': 200, data: users})
    });


    app.get('/users/:id', async (req, res) => {
        const userId = mongo.ObjectID(req.params.id);
        dbo.collection('user').findOne({ '_id': userId}, (err, item) => {
            if(item == null){
                res.status(404).send({status: false,'message': 'user not exist' ,'status_code':  404, 'data':err})
            }else{
                res.send(item);
            }
        
        })
        
    });

    app.put('/users/:id',async(req,res)=>{
        const userId = mongo.ObjectID(req.params.id);
        const item =req.body;
        console.log('edit',userId, 'item to be ',item )
        dbo.collection('user').updateOne({'_id': userId },{ $set: item } , (err, item )=>{
             dbo.collection('user').find().toArray(function(error ,itemm ){
                 if (error) throw error;
                 res.send(itemm);
             });
        })
    })

    app.delete('/users/:id', async (req, res) => {
        const userId = mongo.ObjectID(req.params.id);
        console.log('delete', userId);
        dbo.collection('user').deleteOne({ '_id': userId }, function (err, item) {
            if (err) throw err;
            res.send({'status': true, 'message': 'sucessfully deleted', 'status_code': 200})
        })
    })



})()
app.listen(4000);



    // validate users (dont' create user if already exist in dataase)
    // make command structure of response
    // if user information doesn't exist show informatic infomration [get/deltee/update]


    // app.get('/users', (req, res) => {
    //     res.send(NAME)
    // });
    // app.get('/users/:id', (req, res) => {
    //     //req.params.id

    // })
    // app.put('/users/:id')

//list
//get
//delete
//create
//update
///users resouces
//1 user create
///[posT] /users
//[get] /users  list of users
//[get] /{resources}/{id}
//[delete] /{resource}/{id}
//[put] /{resources}/{id}
//1. create use
// 2. get all useNewUrlParser
// 3. delete users
// 4. update users
// 5. get user details



