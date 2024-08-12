const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');

const home = require('./routes/home');
const shop = require('./routes/shop');
const blog = require('./routes/blog');
const about = require('./routes/about');
const contact = require('./routes/contact');
const cart = require('./routes/cart');
const products = require('./routes/products');
const category = require('./routes/category');
const login = require('./routes/login');
const account = require('./routes/account');
const order = require('./routes/order');


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

app.use(session({
    secret: 'foo',    
    saveUninitialized: false,
    resave: false
}));

app.use((req, res, next) => {
    res.locals.username = req.session.username;
    next();
});


app.use('/', home);
app.use('/shop', shop);
app.use('/blog', blog);
app.use('/about', about);
app.use('/contact', contact);
app.use('/cart', cart);
app.use('/products', products);
app.use('/categories', category);
app.use('/login', login);
app.use('/', account);
app.use('/', order);



app.listen(process.env.PORT);