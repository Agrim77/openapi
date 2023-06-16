console.log('-- dropdown script loaded---')
// document.addEventListener("DOMContentLoaded", function() {
//   const searchInput = document.getElementById("search-input");
//   const searchButton = document.getElementById("search-button");
//   const qsElements = document.getElementsByClassName("qs");

//   function highlightText() {
//     const searchText = searchInput.value.trim().toLowerCase();
//     if (!searchText) {
//       removeHighlights();
//       return;
//     }

//     const qsArray = Array.from(qsElements);
//     const firstMatchIndex = highlightMatches(qsArray, searchText);
//     scrollIntoView(firstMatchIndex);
//   }

//   function highlightMatches(qsArray, searchText) {
//     let firstMatchIndex = -1;

//     qsArray.forEach((qsElement, index) => {
//       const questionElement = qsElement.querySelector(".question_text");
//       const answerElement = qsElement.querySelector(".answer_text");

//       const questionText = questionElement.innerHTML.toLowerCase();
//       const answerText = answerElement.innerHTML.toLowerCase();

//       const questionHighlighted = highlightTextInElement(questionElement, questionText, searchText);
//       const answerHighlighted = highlightTextInElement(answerElement, answerText, searchText);

//       if (firstMatchIndex === -1 && (questionHighlighted || answerHighlighted)) {
//         firstMatchIndex = index;
//       }
//     });

//     return firstMatchIndex;
//   }

//   function highlightTextInElement(element, text, searchText) {
//     const pattern = new RegExp(`(${searchText})`, "gi");
//     const innerHTML = element.innerHTML;
//     const highlightedHTML = innerHTML.replace(pattern, "<span class='highlight'>$1</span>");
//     element.innerHTML = highlightedHTML;
//     return innerHTML !== highlightedHTML;
//   }

//   function removeHighlights() {
//     const highlightedElements = document.getElementsByClassName("highlight");
//     Array.from(highlightedElements).forEach(element => {
//       element.outerHTML = element.innerHTML;
//     });
//   }

//   function scrollIntoView(index) {
//     if (index !== -1) {
//       qsElements[index].scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   }

//   searchButton.addEventListener("click", highlightText);
//   searchInput.addEventListener("keyup", function(event) {
//     if (event.key === "Enter") {
//       highlightText();
//     }
//   });
// });

console.log('-- dropdown script loaded---')
document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
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

  function highlightMatches(qsArray, searchText) {
    let firstMatchIndex = -1;

    qsArray.forEach((qsElement, index) => {
      const questionElement = qsElement.querySelector(".question_text");
      const answerElement = qsElement.querySelector(".answer_text");

      const questionText = questionElement.innerHTML.toLowerCase();
      const answerText = answerElement.innerHTML.toLowerCase();

      const questionHighlighted = highlightTextInElement(questionElement, questionText, searchText);
      const answerHighlighted = highlightTextInElement(answerElement, answerText, searchText);

      if (firstMatchIndex === -1 && (questionHighlighted || answerHighlighted)) {
        firstMatchIndex = index;
      }
    });

    return firstMatchIndex;
  }

  function highlightTextInElement(element, text, searchText) {
    const pattern = new RegExp(`(${searchText})`, "gi");
    const innerHTML = element.innerHTML;
    const highlightedHTML = innerHTML.replace(pattern, "<span class='highlight'>$1</span>");
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

  searchButton.addEventListener("click", highlightText);
  searchInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      highlightText();
    }
  });
});
