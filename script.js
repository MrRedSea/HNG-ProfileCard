function updateUTCTime() {
    const timeElement = document.querySelector('[data-testid="currentTimeUTC"]');
    const now = new Date();
    timeElement.textContent = now.toUTCString();
}

updateUTCTime();
setInterval(updateUTCTime, 1000);

//Avatar upload functionality

document.getElementById('upload-btn').addEventListener('click', function() {
    document.getElementById('avatar-upload').click();
});

document.getElementById('avatar-upload').addEventListener('click', function(e) {
    constfile = e.target.files[0];
    if (files) {
        const reader = new FileReader();
        reader.onload =function(event) {
            const avatar =document.querySelector('[data-testid="test-user-avatar]');
            avatar.src = event.target.result;
        }
        reader.readAsDataURL(file);
    }
});