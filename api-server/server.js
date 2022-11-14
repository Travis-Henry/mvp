const express = require('express');
const {Pool} = require('pg');
const cors = require('cors');

const config = require('./config')[process.env.NODE_ENV||'dev'];


const pool = new Pool({
    connectionString: config.connectionString
});
pool.connect();

const app = express();
const PORT = config.port;
app.use(cors());
app.use(express.json());


app.post('/api/login', (req, res, next)=>{
    let username = req.body.username;
    let password = req.body.password;
    if(password === undefined || username === "undefined"){
        next({status:401, message:"No password or username"});
        return;
    }
    pool.query(`SELECT * FROM users WHERE username = '${username}'`)
    .then((results)=>{
        if(results.rows[0].password === password){
            res.status(202).send("Logged In");
        }else{
            next({status:401, message:"Incorrect Password"});
            return;
        }
    })
    .catch((error)=>{
        next({status:404, message:"User Not Found"});
        return;
    });
});

app.post('/api/login/new', (req, res, next)=>{
    let username = req.body.username;
    let password = req.body.password;
    if(password === undefined || username === "undefined"){
        next({status:401, message:"No password or username"});
        return;
    }

    pool.query(`SELECT * FROM users WHERE username = '${username}'`)
    .then((results)=>{
        if(results.rows.length === 0){
            pool.query(`INSERT INTO users(username, password) VALUES ('${username}','${password}')`)
            .then(()=>{
                res.status(201).send("New account created");
            })
            .catch((error)=>{
                next({status:500, message:"Something went wrong"});
                return;
            });
        }else{
            next({status: 400, message:"Username already exists"});
            return;
        }
    })
    .catch((error)=>{
        next({status: 400, message:"You are in the catch"});
        return;
    });
});

app.get('/api/posts', (req, res, next)=>{
    pool.query(`SELECT posts.post_id, posts.content, posts.user_id, users.username FROM posts JOIN users ON posts.user_id = users.user_id;`)
    .then((results)=>{
        res.send(JSON.stringify(results.rows));
    })
    .catch((error)=>{
        next({status:500, message:"Server Error"});
        return;
    });
});


app.use((err, req, res, next)=>{
    res.status(err.status).send(err.message);
});

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
});