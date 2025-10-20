function updateUTCTime() {
    const timeElement = document.querySelector('[data-testid="currentTimeUTC"]');
    const now = new Date();
    timeElement.textContent = now.toUTCString();
}

updateUTCTime();
setInterval(updateUTCTime, 1000); 

