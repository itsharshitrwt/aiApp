const allQuestions = [
    "What is your favorite type of music?",
    "What do you value most in a friendship?",
    "What is your biggest fear?",
    "What is your ideal weekend activity?",
    "What is your favorite color?",
    "What motivates you the most in life?",
    "How do you usually react to stress?",
    "What is your favorite animal?",
    "What is your greatest strength?",
    "What is your biggest weakness?",
  ];
  
  function getRandomQuestions(count = 10) {
    return allQuestions.sort(() => 0.5 - Math.random()).slice(0, count);
  }
  
  module.exports = { getRandomQuestions };
  



