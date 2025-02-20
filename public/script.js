document.addEventListener("DOMContentLoaded", () => {
    fetch('/questions')
      .then(response => response.json())
      .then(data => {
        const questionContainer = document.getElementById('questions');
        questionContainer.innerHTML = ""; 
  
        data.questions.forEach((question, index) => {
          const questionElement = document.createElement('p');
          questionElement.textContent = `${index + 1}. ${question}`;
          questionContainer.appendChild(questionElement);
        });
      })
      .catch(error => console.error('Error fetching questions:', error));
  });
  