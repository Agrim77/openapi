console.log('-- dropdown script loaded---')
document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("search-input");
  // const searchButton = document.getElementById("search-button");
  const qsElements = document.getElementsByClassName("qs");

  function highlightText() {
    const searchText = searchInput.value.trim().toLowerCase();
    if (!searchText) {
      removeHighlights();
      return;
    }

    removePreviousHighlights();
    const qsArray = Array.from(qsElements);
    const firstMatchIndex = highlightMatches(qsArray, searchText);
    scrollIntoView(firstMatchIndex);
  }

  // let isThanksPage = false;
  // function changeFlags(thanksFlag){
  //   isThanksPage = thanksFlag;
  // }

  function highlightMatches(qsArray, searchText) {
    let firstMatchIndex = -1;
    const endIndex = isThanksPage ? qsArray.length : Math.min(qsArray.length, 2);
    for (let index = 0; index < endIndex; index++) {
      const qsElement = qsArray[index];
      const questionElement = qsElement.querySelector(".question_area");
      const answerElement = qsElement.querySelector(".answer_text");

      const questionText = questionElement.innerHTML.toLowerCase();
      const answerText = answerElement.innerHTML.toLowerCase();
      // console.log(questionText, answerText);

      const questionHighlighted = highlightTextInElement(questionElement, questionText, searchText);
      const answerHighlighted = highlightTextInElement(answerElement, answerText, searchText);

      if (firstMatchIndex === -1 && (questionHighlighted || answerHighlighted)) {
        firstMatchIndex = index;
      }
    }

    return firstMatchIndex;
  }

  function highlightTextInElement(element, text, searchText) {
    const pattern = new RegExp(`(${searchText})`, "gi");
    if(element.style.display === 'none'){
      element.style.display = 'block';
    }
    const innerHTML = element.innerHTML;
    const highlightedHTML = innerHTML.replace(pattern, "<span class='highlight' style='background-color: yellow;'>$1</span>");
    element.innerHTML = highlightedHTML;
    return innerHTML !== highlightedHTML;
  }

  function removePreviousHighlights() {
    const highlightedElements = document.getElementsByClassName("highlight");
    Array.from(highlightedElements).forEach(element => {
      element.outerHTML = element.innerHTML;
    });
  }

  function removeHighlights() {
    const highlightedElements = document.getElementsByClassName("highlight");
    Array.from(highlightedElements).forEach(element => {
      element.classList.remove("highlight");
    });
  }

  function scrollIntoView(index) {
    if (index !== -1) {
      qsElements[index].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
  searchInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      highlightText();
    }
  });
});
