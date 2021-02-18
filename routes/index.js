const express = require('express');
const router = express.Router();
const axios = require('axios');
const registry = require('./registry.json');
const fs = require('fs');   // File System module


router.all('/:apiName/:path', (req, res) => {
    let log = req.params.apiName;
    console.log("apiName: ", log);
    // e.g. curl http://localhost:3000/testapi/fakeapi
    if(registry.services[req.params.apiName]) {
        axios({
            method : req.method,
            url : registry.services[req.params.apiName].url + req.params.path,
            header : req.headers,
            data : req.body
        })  // endpoint localhost:9000/trips
        .then((response) => {
            res.send(response.data);
        })
    } else {
        res.send("API Name doesn't exist");
    }

})

router.get("/trips", (req, res, next) => {
    let u = req.params.trips.length;
    
})

router.post('/register', (req, res) => {
    const registrationInfo = req.body;
    registry.services[registrationInfo.apiName] = { ...registrationInfo};

    fs.writeFile('./route/registry.json', JSON.stringify(registry), (error) => {
        if(error) {
            res.send("Could not register " + registrationInfo.apiName + "\n" + error)
        } else {
            res.send("Succusfully resgistered: '" + registrationInfo.apiName + "'");
        }
    });
})

/*
router.all('/:apiA/:apiB', (req, res) => {
    let log = req.params.apiName;
    console.log("apiName: ", log);
    axios.get('http://localhost:3001/' + req.params.apiA.apiB)  // endpoint localhost:9000/trips
    .then((response) => {
        res.send(response.data);
    })

}) */

module.exports = router;