function getBase64(file, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result);
    reader.onerror = error => {
        console.log('Error: ', error);
    };
}

function uploadImage() {
    var input = document.getElementById('imageUpload');
    if(input.files && input.files[0]) {
        getBase64(input.files[0], function(base64ImageString) {
            // You now have the Base64 image string, send this to the server
            analyzeImage(base64ImageString);
        });
    } else {
        alert('Please select an image.');
    }
}
function analyzeImage(imageData) {
    const azureFunctionUrl = 'https://VisionED.azurewebsites.net/api/VisionEDfunction';

    // Remove the metadata from the Base64 string
    imageData = imageData.replace(/^data:image\/[a-z]+;base64,/, "");

    fetch(azureFunctionUrl, {
        method: 'POST',
        body: JSON.stringify({ image: imageData }),
        headers: {
            'Content-Type': 'application/json',
            'x-functions-key': 'm1zL1Olpp6rtpmgn55FreIOk9kGeem8hWGg-Osr8BlzRAzFu-ditUw==' // only if you need to authenticate
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('results').textContent = JSON.stringify(data, null, 2);
    })
    .catch((error) => {
        console.error('Error:', error);
        document.getElementById('results').textContent = 'Error: Could not analyze image.';
    });
}

