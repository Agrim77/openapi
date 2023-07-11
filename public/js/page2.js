document.addEventListener("DOMContentLoaded", function() {
  console.log('----page2.js : navbar and paypal btn---');
  const showPaypalButton = document.getElementById("show_paypal");
  const paypalDiv = document.getElementById("paypal_button");
  showPaypalButton.addEventListener("click", function() {
    console.log("Clicked-- to show paypal");
    paypalDiv.style.display = "block" ;
    showPaypalButton.style.display = "none";
  });

  let search_field = document.getElementById("search-input");

  document.addEventListener('keypress', function onClick(event) {
  
    search_field.style.background = '#F1F6F7';
  });
  
  // const navbar = document.getElementById("navbar");
  // const page2 = document.querySelector(".page2");
  // const page2BgColor = getComputedStyle(page2).backgroundColor;
  // // Function to change the navbar background color
  // navbar.style.backgroundColor = page2BgColor;
});

