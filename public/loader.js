// fetch("/execute-model1")
//   .then((response) => response.json())
//   .then((result) => {
//     // Handle the result
//     // Render the success page or update the UI accordingly
    
//   })
//   .catch((error) => {
//     console.error(error);
//     // Render the error page or handle the error
//   });
document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        document.querySelector(
            "body").style.visibility = "hidden";
        document.querySelector(
            "#loader").style.visibility = "visible";
    } else {
        document.querySelector(
            "#loader").style.display = "none";
        document.querySelector(
            "body").style.visibility = "visible";
    }
};