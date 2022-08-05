const express = require("express");
const cors = require("cors");
const path = require('path');
const app = express();
const context = require('./service/context.service');
const loginHandler = require('./controllers/login.controller');
const dashHandler = require('./controllers/dashboard.controller');
const trackerHandler = require('./controllers/tracker.controller');
const authMiddleware = require('./middleware/auth');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const Enum = require('./infrastructure/enum.util');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.use(cors());
app.set('trust proxy', 1) // trust first proxy
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//session middleware
const expire = 1000 * 60 * 60 * 24 *30;//30days
app.use(sessions({
    secret: "I had once gone to Ujjaini On the banks of the river Shipra Far far away in that land of dreams",
    saveUninitialized:true,
    cookie: { maxAge: expire },
    resave: false
}));

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
    if (err.status== 419)
        res.redirect(`/?error=${err}`)  
    else
        next(err); 
  });
// simple route
app.get("/ping", (req, res) => {
    res.status(200).send('pong');    
});



app.get("/", (req, res) => {
    req.session.destroy()
    var hostname = req.protocol + '://' + req.hostname;
    if (context.Environment ==='development')
        hostname = req.protocol + '://' + req.header('host');
    res.render('pages/signin',{hostname:req.protocol + '://' + req.header('host'), msg:req.query.error});
});
app.post("/login", (req, res) => {   
    loginHandler.Login(req, res) 
});

app.get("/dashboard", authMiddleware, (req, res) => { 
    
    res.render('pages/dashboard',{username:req.session.displayName, sidenav:'dashboard'});
});

app.get("/tracker", authMiddleware, (req, res) => { 
    
    res.render('pages/tracker',{username:req.session.displayName, sidenav:'tracker'});
});

app.get("/dropOffGroupByEvents", authMiddleware, async (req, res) => {  
    
    result = await dashHandler.DropOffGroupByEvents(req,res) 
    
    if (result.status==Enum.Status.Success)
        res.status(200).json(result.data)
    else
        res.status(500).json(result.message)
    
});
app.get("/getConversions", authMiddleware, async (req, res) => {  
    result = await dashHandler.GetConversions(req,res) 
    
    if (result.status==Enum.Status.Success)
        res.status(200).json(result.data)
    else
        res.status(500).json(result.message)
});
app.get("/getCarryForwardConversion", authMiddleware, async (req, res) => {  
    result = await dashHandler.GetCarryForwardConversion(req,res) 
    
    if (result.status==Enum.Status.Success)
        res.status(200).json(result.data)
    else
        res.status(500).json(result.message)
});
app.get("/getFullJourneyConversion", authMiddleware, async (req, res) => {  
    result = await dashHandler.GetFullJourneyConversion(req,res) 
    
    if (result.status==Enum.Status.Success)
        res.status(200).json(result.data)
    else
        res.status(500).json(result.message)
});
app.get("/getTrackerConversion", authMiddleware, async (req, res) => {  
    result = await trackerHandler.GetTrackerConversion(req,res) 
    
    if (result.status==Enum.Status.Success)
        res.status(200).json(result.data)
    else
        res.status(500).json(result.message)
});
// set port, listen for requests
const PORT = context.ExpressPort || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});