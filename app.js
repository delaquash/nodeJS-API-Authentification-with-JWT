const express = require ('express');
const jwt = require('jsonwebtoken');

const app= express();


app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});

app.post ('/api/posts', verifyToken, (req,res) => {
    res.json({
        message: 'Post created...'
    });
});

app.post('/api/login',  (req, res)=> {
    // Mock User
    const user ={
        id: 1,
        username: 'delaquarsh',
        email:'olaide@gmail.com'
    };

    jwt.sign({user}, 'secretkey', (err, token) => {
        res.json({
             token
        });
    });
});

// Formating of Token


// Verify Token-----Middleware function

function verifyToken(req, res, next) {

    // Get auth header value
    const bearHeader = req.headers['authorization'];

    // Check if bearer is undefined
    if(typeof bearHeader !== 'undefined'){
        // Split at the space
        const bearer =  bearerHeader.split('');
        // get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Calling the next middleware
        next();
    } else {
        // forbidden
        res.sendStatus(403)
    }
}

app.listen(5000, () => console.log('Server started at port 5000'));
