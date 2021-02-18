// To run in background cmd: forever start server.js
// To stop run in background cmd: forever stop server.js
// use "nodemon server.js" command instead of "node server.js"

const { response } = require('express');
const express = require('express');
const app = express();
const PORT = 3001;
const db = require('./db.json');
const db2 = require('./suggestions.json');
const fetch = require('node-fetch');

const createServer = require('http').createServer;

// To test this api
// curl -X (GET or POST) http://localhost:3000/(testapi or api)/trips
const data = db;
let searchTrip = { trips : [], temp : [] };
app.use(logger);

const decodeParams = (searchParams) => Array
  .from(searchParams.keys())
  .reduce((acc, key) => ({ ...acc, [key]: searchParams.get(key) }), {});

app.use(express.json())

app.get('/', (req, res) => {
    console.log("HOME");
    res.send("home page");  
})

app.get('/fakeapi', (req, res, next) => {
    res.send('Hi From fake server: HOME');
})

// app.get("/trips", keyword, (req, res) => {
//     //res.send('[GET] trips HELLO');
//     console.log("get trips", req.originalUrl);
//     console.log("api ", req.keyword);
//     res.send(db);
// }) 

app.get("/trips", (req, res) => {
    res.json(db2);
})

function logger(req, res, next) {
    console.log("LOG: ", req.originalUrl);
    next();
}

function keyword(req, res, next) {
    console.log("Log keyword:", req.query);
    let word = req.originalUrl;
    
    let has = false;
    for(let e in db.length) {
        console.log(db[e]);
    }
    console.log('has: ', has);
    console.log('word:  ', word);
    console.log('1:', req.query.keyword);
    if(req.query.keyword) {
        req.send(db);
        next();
    }
    else {
        let i = 0;
        const { tag } = data.trips;
        for(let e in data.trips) {
            if(data.trips[e].tags) {
                if(data.trips[e].eid == '1') {
                    //console.dir(data.trips[e].tags[0]);
                    console.log(data.trips[e].eid);
                    for(let c = 0;c < data.trips[e].tags.length;++c) {
                        //console.dir(data.trips[e].tags[c]);
                        //console.log("eid: ", data.trips[e].eid[c]);
                        if(data.trips[e].tags[c] === "เกาะ") {
                            console.log("eid: " + data.trips[e].eid[c] + " tag: "+ data.trips[e].tags[c]);
                            //searchTrip.temp.push()
                        }
                    }
                }
                //console.dir(data.trips[e].tags[i]);
            }
        }
        //res.json(data);
        res.send("No keyword");
    }
    //next();
}

app.get('/bogusapi', (req, res, next) => {
    res.send('[GET] Bogus api HELLO');
}) 

app.post('/bogusapi', (req, res, next) => {
    res.send('[POST] Bogus api HELLO');
})

app.listen(PORT, () => {
    console.log('fake server port: ', PORT);
})
