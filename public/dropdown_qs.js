document.addEventListener("DOMContentLoaded", function() {
    const dropdownBtn = document.querySelector(".dropdown-btn");
    const dropdownContent = document.querySelector(".dropdown-content");
  
    dropdownBtn.addEventListener("click", function() {
      dropdownContent.classList.toggle("show");
    });
  
    const dropdownItems = document.querySelectorAll(".dropdown-item");
    dropdownItems.forEach(function(item) {
      item.addEventListener("click", function() {
        const questionId = this.getAttribute("data-question-id");
        const questionElement = document.getElementById(`question${questionId}`);
        questionElement.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  });