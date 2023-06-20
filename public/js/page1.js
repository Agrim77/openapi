document.addEventListener('DOMContentLoaded', () => {
  const scrollButton = document.getElementById("scrollButton");
  const section = document.getElementById("cv_card");
  
  scrollButton.addEventListener("click", () => {
    section.scrollIntoView({ behavior: "smooth" });
  });
});
