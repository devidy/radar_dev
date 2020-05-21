const express  = require('express');
const mongoose = require('mongoose');
const routes   = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://devidy:devidy@cluster0-enkyx.mongodb.net/devRadar?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(routes);


app.listen(3000);