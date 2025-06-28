window.addEventListener('DOMContentLoaded', function() {
    const year = this.document.getElementById('current-year');
    year.textContent = new Date().getFullYear();
});