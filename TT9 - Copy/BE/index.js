const express = require("express");
const bodyParser = require("body-parser");
const db = require ('./db/db');
const cors = require('cors');

const accountRepo = require('./repositories/account.repository');
const attemptRepo = require('./repositories/attempt.repository');
const quizRepo = require('./repositories/quiz.repository');
const questionRepo = require('./repositories/question.repository');

const port = 8463;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.listen(port, () =>  {
    console.log("Server is running and listeng on port", port);
});

app.post('/signup', accountRepo.signup);
app.post('/login', accountRepo.login);
app.post('/addquiz', quizRepo.add_quiz);
app.get('/getquiz', quizRepo.get_user_quiz);
app.post('/addquiz', questionRepo.add_question);
app.get('/getquestions', questionRepo.get_questions);
app.post('/addattempt', attemptRepo.add_attempt);
app.get('/getattempts',attemptRepo.get_user_attempts);