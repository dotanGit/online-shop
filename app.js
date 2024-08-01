const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const methodOverride = require('method-override');


const home = require('./routes/home');
const products = require('./routes/products');
const category = require('./routes/category');

const env = process.env.NODE_ENV || 'local';
require('custom-env').env(env, './config');


mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});


var app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'))
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride('_method'));


app.use('/', home);
app.use('/products', products);
app.use('/categories', category);


app.listen(process.env.PORT);