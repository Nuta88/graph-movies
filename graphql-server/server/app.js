const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const mongoose = require('mongoose');

const schema = require('../schema/shema');

const app = express();
const PORT = 3005;

mongoose.connect('mongodb://localhost/graphdb', err => {
    if (err) throw err;
    console.log('Successfully connected');
});

app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(PORT, err => {
    err ? console.log(err) : console.log('Server started!');
});