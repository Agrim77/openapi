document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("search-button");
  
    searchButton.addEventListener("click", function() {
      const dropdown = document.querySelector(".dropdown-menu");
      const selectedQuestion = dropdown.querySelector(".selected");
  
      if (selectedQuestion) {
        const questionId = selectedQuestion.getAttribute("href").substring(1);
        const questionElement = document.getElementById(questionId);
  
        if (questionElement) {
          questionElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });
  