const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Productrouter = require('./routes/ProductRouter');
const UploadRouter = require('./routes/UploadRouter');
const UserRouter = require('./routes/UserRouter');

app.use(express.json());

app.use('/api/products', Productrouter);
app.use('/api/upload', UploadRouter);
app.use('/api/users', UserRouter);

app.listen(3006, () => {
    console.log("server is running on port no 3006");
});

mongoose.connect('mongodb://127.0.0.1/e-commers').then(() => {
    console.log("db is running");
}).catch(err => console.log(err));