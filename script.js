// Variables
let video, canvas, context, beep;
let blinkCount = 0;
let blinkThreshold = 3;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    beep = document.getElementById('beep');
});

// Start detection
function startDetection() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            setInterval(detectDrowsiness, 1000); // Run detection every second
        })
        .catch(error => {
            console.error('Error accessing camera:', error);
        });
}

// Detect drowsiness
// Detect drowsiness
function detectDrowsiness() {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
    // Perform face recognition and eye blinking detection
    // ...
  
    // Assuming blinkStatus is a boolean value indicating if the person blinked
    const blinkStatus = Math.random()<0.5; // Change this line with your actual blink detection
  
    if (!blinkStatus) {
      blinkCount++;
      if (blinkCount >= blinkThreshold) {
        beep.play();
        // Redirect to the result page with drowsy status
        window.location.href = `result.html?result=drowsy`;
      }
    } else {
      blinkCount = 0;
    }
  
    // Check if eyes are closed continuously for 5 seconds
    if (blinkCount === 0) {
      setTimeout(() => {
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const averageBrightness = calculateAverageBrightness(imageData);
        if (averageBrightness < 20) {
          beep.play();
          // Redirect to the result page with sleeping status
          window.location.href = `result.html?result=sleeping`;
        }
      }, 5000);
    }
  
    // Check if eyes are open continuously for 1 minute
    if (blinkCount === 0) {
      setTimeout(() => {
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const averageBrightness = calculateAverageBrightness(imageData);
        if (averageBrightness > 100) {
          beep.play();
          // Redirect to the result page with active status
          window.location.href = `result.html?result=active`;
        }
      }, 60000);
    }
  }
  
  // Calculate average brightness of an image
  function calculateAverageBrightness(imageData) {
    const { data } = imageData;
    let sumBrightness = 0;
  
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const brightness = (r + g + b) / 3;
      sumBrightness += brightness;
    }
  
    const averageBrightness = sumBrightness / (data.length / 4);
    return averageBrightness;
  }
  