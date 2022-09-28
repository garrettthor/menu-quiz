const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
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

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req,res) => {
    res.render('home');
});

app.get('/quiz/new', (req, res) => {
    res.render('quiz/new');
})

app.post('/quiz', async (req, res) => {
    const question = new Question(req.body.question);
    await question.save();
    res.redirect('quiz/list')
})

app.get('/quiz/adminIndex', (req, res) => {
    res.render('quiz/adminIndex')
})

app.get('/quiz', async (req, res) => {
    const questions = await Question.find({});
    res.render('quiz/index', { questions });
})

app.get('/quiz/list', async (req, res) => {
    const questions = await Question.find({});
    res.render('quiz/list', { questions });
})

app.get('/quiz/:id', async (req, res) => {
    const question = await Question.findById(req.params.id);
    res.render('quiz/show', { question });
})

app.get('/quiz/:id/edit', async (req, res) => {
    const question = await Question.findById(req.params.id)
    res.render('quiz/edit', { question });
})

app.put('/quiz/:id', async (req, res) => {
    const { id } = req.params;
    const question = await Question.findByIdAndUpdate(id, { ...req.body.question });
    res.redirect(`/quiz/${question._id}`);
})

app.delete('/quiz/:id', async (req, res) => {
    const { id } = req.params;
    await Question.findByIdAndDelete(id);
    res.redirect('/quiz/list');
})

// app.get('/newquestion', async (req, res) => {
//     const question = new Question({ number: 1, question: 'Is this the first question?', correctAns: 'Yes', wrongAns1: 'No', wrongAns2: 'Maybe', wrongAns3: 'I dunno' })
//     await question.save();
//     res.send(question)
// })

app.listen(1984, () => {
    console.log('Serving on port 1984')
})