document.addEventListener("DOMContentLoaded", function() {
  console.log('----NAvbar change page2.js---');
  const navbar = document.getElementById("navbar");
  const page2 = document.querySelector(".page2");
  const page2BgColor = getComputedStyle(page2).backgroundColor;
  // Function to change the navbar background color
  navbar.style.backgroundColor = page2BgColor;
});

