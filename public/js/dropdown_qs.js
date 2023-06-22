document.addEventListener("DOMContentLoaded", function() {
    const dropdownItems = document.querySelectorAll(".dropdown-item");
    dropdownItems.forEach(function(item) {
      item.addEventListener("click", function() {
        const questionId = this.getAttribute("data-question-id");
        const questionElement = document.getElementById(`question${questionId}`);
        questionElement.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  });