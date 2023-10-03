const { Router } = require('express');
const routes = Router();
const jwt = require('jsonwebtoken');
const _ = require('underscore');
const users = require('../data/users.json');


routes.post('/users/login', (req, res) => {

    const reqUser = req.body;
    let foundUser = null;
    let token;

    // for(var i = 0; i < users.length; i++)
    // {
    //     if(users[i].email === reqUser.email && users[i].password === reqUser.password)
    //     {
    //         foundUser = users[i];
    //         foundUser.password = "";            
    //     }
    // }

    _.each(users, (user, i) => {
        if(user.email == reqUser.email && user.password == reqUser.password)
        {
            foundUser = {email: user.email, username: user.username};         
        }
    });

    console.log(foundUser);

    if(foundUser)
    {
        token = jwt.sign({foundUser}, '#sup3rm3rc4d03xpr3ss#');
    }
    else
    {
        token = null;
    }

    res.send({token});
});

module.exports = routes;