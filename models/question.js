const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    number: Number,
    question: String,
    correctAns: String,
    wrongAns1: String,
    wrongAns2: String,
    wrongAns3: String
})

module.exports = mongoose.model('Question', QuestionSchema);