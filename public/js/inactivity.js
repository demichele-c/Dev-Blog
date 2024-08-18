let timeout;
const maxIdleTime = 30 * 60 * 1000; // 30 minutes

function resetTimer() {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    alert('Session expired. Please log in again.');
    window.location.replace('/login');
  }, maxIdleTime);
}

window.onload = resetTimer;
document.onmousemove = resetTimer;
document.onkeypress = resetTimer;
