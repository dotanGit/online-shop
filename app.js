const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const env = process.env.NODE_ENV || 'local';
require('custom-env').env(env, './config');

var app = express();

app.use(express.static('public'))
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());

app.listen(process.env.PORT);