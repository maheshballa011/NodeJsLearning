const express = require('express');
const uuidv4 = require('uuid/v4');
const Joi = require('@hapi/joi');

//validating for userschema
const userSchema = Joi.object({
    login: Joi.string()
        .required(),

    password: Joi.string()
        .alphanum()
        .required(),

    age: Joi.number()
        .integer()
        .min(4)
        .max(130)
        .required(),

    isDeleted: Joi.bool().valid(true).valid(false)
    .required()

});


const router = express.Router();

const app = express();

const port = '3030';

let users = [
    {
        "id": 1,
        "login": "maheshballa",
        "password": "epam",
        "age": 29,
        "isDeleted": false
    },
    {
        "id": 2,
        "login": "srikanthmunaga",
        "password": "epam",
        "age": 28,
        "isDeleted": false
    },
    {
        "id": 3,
        "login": "srinivas",
        "password": "epam",
        "age": 28,
        "isDeleted": false
    },
    {
        "id": 3,
        "login": "santosh",
        "password": "epam",
        "age": 28,
        "isDeleted": false
    }
];

function getAutoSuggestUsers(loginSubstring, limit){
    let _users = users.filter(user => {
        return user.login.indexOf(loginSubstring) !== -1 && !user.isDeleted;
    });

    _users.sort(function(a, b){
        if(a.login < b.login) { return -1; }
        if(a.login > b.login) { return 1; }
        return 0;
    });
    return _users.slice(0, limit);
}

function errorResponse(schemaErrors){

    const errors = schemaErrors.map(error=>{
        let {path, message} = error;
        return {path, message};
    });

    return {
        status: 'failed',
        errors
    }

}

function validateSchema(schema){

    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false
        });

        if(error && error.isJoi){
            res.status(400).json(errorResponse(error.details));
        }else{
            next();
        }
    }

}

app.use(express.json());


app.post('/users', validateSchema(userSchema), (req, res) => {
    let _user = req.body;
    _user.id = uuidv4();
    users.push(_user);
    res.json({users: users});
});

app.put('/users/:id', validateSchema(userSchema), (req, res) => {
    const _userIndex = users.findIndex((user)=>{
        return user.id == req.params.id;
    });
    console.log(_userIndex);
    users[_userIndex] = {...users[_userIndex], ...req.body};
    res.json(users);
});

app.get('/users', (req, res) => {
    const _users = users.filter(user=>{
        return !user.isDeleted;
    })
    res.json({users: _users});
});

app.get('/users/:id', (req, res) => {
    const _user = users.find((user)=>{
        return user.id == req.params.id;
    });
    console.log(_user);
    console.log(req.params.id);
    res.json(_user);
});

app.delete('/users/:id', (req, res) => {
    const _users = users.map((user)=>{

        if(user.id == req.params.id){
            user.isDeleted = true;
        }

        return user;

    });
    users = _users;
    res.json(users);
});

app.get('/users/:loginSubstring/:limit', (req, res) => {
    const _users = getAutoSuggestUsers(req.params.loginSubstring, req.params.limit);
    res.json(_users);
});

app.listen(port);