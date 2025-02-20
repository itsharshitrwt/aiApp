
const express = require('express');
const path = require('path');
require('dotenv').config();

const questionsRoutes = require('./routes/questions');
const quizRoutes = require('./routes/quiz');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/questions', questionsRoutes);
app.use('/quiz', quizRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
