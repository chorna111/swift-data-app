"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loadData_1 = require("./loadData");
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 8000;
mongoose.connect('mongodb://localhost/swift-data')
    .then(() => console.log('Connected to Mongodb'));
app.use(express.json());
app.listen(port, () => console.log('server started'));
app.use(express.static('build'));
(0, loadData_1.getData)();
