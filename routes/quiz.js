const express = require('express');
const { analyzePersonality } = require('../utils/analysis');
const { getRandomQuestions } = require('../utils/questionsData');

const router = express.Router();
let questions = getRandomQuestions();

router.post('/', async (req, res) => {
  const answers = req.body.answers;

  if (!answers || answers.length !== questions.length || answers.some(answer => answer.trim() === "")) {
    return res.status(400).json("Answer required questions");
  }

  const analysis = await analyzePersonality(answers, questions);
  res.json({ result: analysis });
});

module.exports = router;
