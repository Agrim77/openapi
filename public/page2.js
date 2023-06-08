console.log("Script for succes.ejs loaded");
  const navbar = document.getElementById("navbar");
  const page2 = document.querySelector(".page2");
  const page2BgColor = getComputedStyle(page2).backgroundColor;
  // Function to change the navbar background color
  function changeNavbarColor(color) {
    navbar.style.backgroundColor = color;
  }

  changeNavbarColor(page2BgColor);