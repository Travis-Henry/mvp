const express = require('express');
const {Pool} = require('pg');

const config = require('./config')[process.env.NODE_ENV||'dev'];


const pool = new Pool({
    connectionString: config.connectionString
});
pool.connect();

const app = express();
const PORT = config.port;
app.use(express.json());


app.get('/api/users', (req, res)=>{
    pool.query(`SELECT * FROM users`)
    .then((results)=>{
        res.send(results.rows);
    })
    .catch((error)=>{
        res.status(400).send("Bad Request");
    });
});

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
});