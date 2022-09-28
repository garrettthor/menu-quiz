const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Question = require('./models/question.js');

mongoose.connect('mongodb://localhost:27017/menu-quiz', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req,res) => {
    res.render('home')
});

app.get('/newquestion', (req, res) => {
    const question = new Question
})

app.listen(1984, () => {
    console.log('Serving on port 1984')
})