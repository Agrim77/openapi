const scrollButton = document.getElementById('scrollButton');
console.log("In page 1 script  of index ejs");
  const targetCard = document.getElementById('exp');
      // const dragDropText = document.getElementById('dragDropText');

  scrollButton.addEventListener('click', () => {
      console.log("Scroll button clicked");
        targetCard.scrollIntoView({ behavior: 'smooth' });
  });