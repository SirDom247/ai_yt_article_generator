/*n const progressValue = document.getElementById("progress-value");
const circle = document.querySelector(".circle");
const progressContainer = document.getElementById("progress-container");
const startBtn = document.getElementById("start-btn");
const responseDiv = document.getElementById("response");

let progress = 0;
let interval;

// Function to update the circular progress bar
function startLoading() {
    progressContainer.style.display = "block"; // Show the progress bar
    progress = 0; // Reset progress

    // Increment progress every 50ms
    interval = setInterval(() => {
        if (progress < 100) {
            progress += 1; // Increment progress
            circle.style.background = `conic-gradient(#3498db ${progress * 3.6}deg, #ddd ${progress * 3.6}deg)`;
            progressValue.textContent = `${progress}%`;
        }
    }, 50);
}

// Function to stop the progress bar
function stopLoading() {
    clearInterval(interval); // Stop the interval
    progressContainer.style.display = "none"; // Hide the progress bar
}

// Simulate a server request
async function requestResources() {
    startLoading(); // Start the progress bar

    try {
        // Simulating a server request (replace with actual fetch/axios request)
        const response = await new Promise((resolve) =>
            setTimeout(() => resolve("Article generated successfully!"), 7000) // Simulates a 5-second delay
        );

        responseDiv.textContent = response; // Display the response

        // Clear the response after 20 seconds
        setTimeout(() => {
            responseDiv.textContent = ""; // Clear the response
        }, 2000); // 20 seconds
    } catch (error) {
        responseDiv.textContent = "Error loading resources.";
        console.error(error);

        // Clear the error message after 20 seconds
        setTimeout(() => {
            responseDiv.textContent = ""; // Clear the error message
        }, 2000); // 20 seconds
    } finally {
        stopLoading(); // Stop the progress bar after request is complete
    }
}

// Add a click event listener to the button
startBtn.addEventListener("click", requestResources)
*/

<script>
        document.getElementById('generateButton').addEventListener('click', async () => {
            

            const youtubeLink = document.getElementById('youtubeLink').value;
            const blogContent = document.getElementById('blogContent');
            
            if(youtubeLink) {
                document.getElementById('loading-circle').style.display = 'block';
                
                blogContent.innerHTML = ''; // Clear previous content

                const endpointUrl = '/generate-blog';
                
                try {
                    const response = await fetch(endpointUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ link: youtubeLink })
                    });

                    const data = await response.json();

                    blogContent.innerHTML = data.content;

                } catch (error) {
                    console.error("Error occurred:", error);
                    alert("Something went wrong. Please try again later.");
                    
                }
                document.getElementById('loading-circle').style.display = 'none';
            } else {
                alert("Please enter a YouTube link.");
            }
        });
    </script>
