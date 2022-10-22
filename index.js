const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
var useragent = require('express-useragent');
var nodemailer = require('nodemailer');

let app = express();

///////route file declaration//////////
const event=require("./routes/event")
const eventroute=require("./routes/eventroute")
const userFunctionalities=require("./routes/userfunctionalities");



app.use(bodyParser.urlencoded({
    extended: true, limit: '150mb'
}));
app.use(bodyParser.json({ limit: '150mb' }));

mongoose.connect(process.env.MONGOURL || 'mongodb+srv://anupnair:Anupnair@cluster0.vwyes.mongodb.net/eventmanagement?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    // if(data)
    //     console.log("db success", data)
    // if(error)
    //     console.log("db error", error)
    console.log("Db connected")
}).catch((ex) => {
    console.log("Db connection error")
    console.log(ex)
});



var db = mongoose.connection;

var port = process.env.PORT || 6001;

app.use(cors());
app.use(helmet({crossOriginResourcePolicy : false}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(useragent.express());
app.use((req, res, next) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(fullUrl)
    next();
})


///app.use()
app.use(event)
app.use(eventroute)
app.use(userFunctionalities)


const server = app.listen(port, function () {
    console.log("Running Server on port " + port);
});