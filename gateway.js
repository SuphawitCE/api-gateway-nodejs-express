// npm run dev

const express = require('express');
const app = express();
const routes = require('./routes');
const PORT = 3000;

app.use(express.json())
app.use('/', routes)

app.listen(PORT, () => {

    console.log("Gateway port: ", PORT);
})
