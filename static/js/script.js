// Function to handle prediction button click event
document.getElementById('predict-button').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        fetch('/predict', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Update HTML with prediction result
            document.getElementById('predictionResult').innerHTML = `
                <p>Prediction: ${data.prediction}</p>
                <p>Confidence: ${data.confidence}</p>
            `;
            // Show the result container after updating the prediction result
            showResultContainer();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        alert('Please select an image file.');
    }
});

// Function to show the result container
function showResultContainer() {
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.style.display = 'block'; // Show the container
}

// Function to handle file input change event
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const image = new Image();
        image.src = event.target.result;
        image.style.maxWidth = '200px'; // Adjust image preview size as needed
        image.style.marginTop = '10px'; // Adjust margin as needed
        
        const imageName = document.createElement('p');
        imageName.textContent = file.name;
        
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.innerHTML = ''; // Clear previous preview
        imagePreview.appendChild(image);
        imagePreview.appendChild(imageName);
    };
    
    reader.readAsDataURL(file);
});

// Function to toggle answer visibility
document.querySelectorAll('.question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        answer.classList.toggle('show-answer');

        const arrow = question.querySelector('.arrow');
        arrow.textContent = answer.classList.contains('show-answer') ? '▲' : '▼';
    });
});
