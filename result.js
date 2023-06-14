// Variables
let resultCanvas, resultContext;

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  resultCanvas = document.getElementById("result-canvas");
  resultContext = resultCanvas.getContext("2d");

  // Get the result data from the query parameter
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const result = urlParams.get("result");

  // Display the result
  displayResult(result);
});

// Display the result on the page
function displayResult(result) {
  const resultMessage = document.getElementById("result-message");

  if (result === "drowsy") {
    resultMessage.textContent = "Drowsiness Detected!";
    // Play the alarm sound
    var count = 1;
    const alarm = document.getElementById("alarm");
    alarm.onended = function () {
      if (count <= 3) {
        count++;
        this.play();
      }
    };
    alarm.play();
  } else {
    resultMessage.textContent = "No Drowsiness Detected";
  }

  // Load the image associated with the result
  const img = new Image();
  // img.src = `${result}.jpg`; // Replace with the actual image path
  img.onload = () => {
    resultContext.drawImage(img, 0, 0, resultCanvas.width, resultCanvas.height);
  };
}
