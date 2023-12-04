function uploadImage() {
    var input = document.getElementById('imageUpload');
    if(input.files && input.files[0]) {
        // TODO: Add code to send the image to the server
        alert('Image uploaded. Now implement the code to send this to the server.');
    } else {
        alert('Please select an image.');
    }
}
