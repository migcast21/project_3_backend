const express = require('express');
const methodOverride  = require('method-override');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()
const Travels = require('./models/travels.js');
const cors = require('cors');
const db = mongoose.connection;
const LosAngeles = require('./models/losAngeles.js');

//middleware//
app.use(cors());
app.use(express.json())
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

const PORT = process.env.PORT || 3003;
const MONGODB_URI  = process.env.MONGODB_URI 

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//BOSTON BELOW//
//create route
app.post('/travels', (req, res) => {
    Travels.create(req.body, (err, createdTravel) => {
        res.json(createdTravel);
    });
});
app.get('/' , (req, res) => {
    res.send('Hello World');
  });
//index route
app.get('/travels', (req, res) => {
    Travels.find({}, (err, foundTravels) => {
        res.json(foundTravels);
    });
});
//delete route
app.delete('/travels/:id', (req, res) => {
    Travels.findByIdAndRemove(req.params.id, (err, deletedTravels) => {
        res.json(deletedTravels);
    });
});
//edit route
app.put('/travels/:id', (req, res) => {
    Travels.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedTravel) => {
        res.json(updatedTravel);
    });
});

//LOS ANGELES BELOW//
//create route
app.post('/losAngeles', (req, res) => {
    LosAngeles.create(req.body, (err, createdLosAngeles) => {
        res.json(createdLosAngeles);
    });
});

//index route
app.get('/losAngeles', (req, res) => {
    LosAngeles.find({}, (err, foundLosAngeles) => {
        res.json(foundLosAngeles);
    });
});
//delete route
app.delete('/losAngeles/:id', (req, res) => {
    LosAngeles.findByIdAndRemove(req.params.id, (err, deletedLosAngeles) => {
        res.json(deletedLosAngeles);
    });
});
//edit route
app.put('/losAngeles/:id', (req, res) => {
    LosAngeles.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedLosAngeles) => {
        res.json(updatedLosAngeles);
    });
});

app.listen(PORT, () => console.log( 'Listening on port:', PORT));
mongoose.connect(MONGODB_URI, () => {
    console.log('whatever')
})
mongoose.connection.once('open', () => {
    console.log('connected to mongod...');
})
