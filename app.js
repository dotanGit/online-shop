const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const products = require('./routes/products');


const env = process.env.NODE_ENV || 'local';
require('custom-env').env(env, './config');

mongoose.connect(process.env.CONNECTION_STRING, 
    {   useNewUrlParser: true, 
        useUnifiedTopology: true });

var app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'))
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());

app.use('/products', products);

app.listen(process.env.PORT);