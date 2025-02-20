const express = require('express');
const { getRandomQuestions } = require('../utils/questionsData');

const router = express.Router();
let questions = getRandomQuestions();

router.get('/', (req, res) => {
  res.json({ questions: questions });
});

module.exports = router;
