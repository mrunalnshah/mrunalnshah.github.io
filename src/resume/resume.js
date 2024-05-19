function toggleMenu() {
    var nav = document.getElementById("navigationBar");
    var links = nav.querySelectorAll("a:not(.icon)");
    links.forEach(function (link) {
        link.style.display = link.style.display === "block" ? "none" : "block";
    });
}

// Adjust zoom level for larger screens (optional)
document.body.style.zoom = "100%";

document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const themeToggleBtn = document.getElementById("theme-toggle");
    
    // Check if there's a theme stored in localStorage
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme === "dark") {
        // Apply dark mode
        body.classList.add("dark-mode");
        themeToggleBtn.innerHTML = "Wanna see light?";
        themeToggleBtn.classList.add("dark-mode");
    } else {
        // Apply light mode (default)
        body.classList.add("light-mode");
        themeToggleBtn.innerHTML = "Get into darkness!";
        themeToggleBtn.classList.add("light-mode");
    }
});

document.getElementById("theme-toggle").addEventListener("click", function () {
    const body = document.body;
    const themeToggleBtn = document.getElementById("theme-toggle");

    if (body.classList.contains("light-mode")) {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
        themeToggleBtn.innerHTML = "Wanna see light?";
        themeToggleBtn.classList.remove("light-mode");
        themeToggleBtn.classList.add("dark-mode");
        // Store the selected theme in localStorage
        localStorage.setItem("theme", "dark");
    } else {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        themeToggleBtn.innerHTML = "Get into darkness!";
        themeToggleBtn.classList.remove("dark-mode");
        themeToggleBtn.classList.add("light-mode");
        // Store the selected theme in localStorage
        localStorage.setItem("theme", "light");
    }
});



document.addEventListener('DOMContentLoaded', () => {
    const pdfViewer = document.getElementById('pdf-viewer');
    const pdfTitle = document.getElementById('pdf-title');
    const detailedResumeBtn = document.getElementById('view-detailed-resume');
    const standardResumeBtn = document.getElementById('view-standard-resume');

    detailedResumeBtn.addEventListener('click', () => {
        pdfViewer.classList.remove('fade-in');
        pdfViewer.offsetWidth; // Trigger reflow
        pdfViewer.classList.add('fade-in');
        pdfViewer.src = 'resume-detailed.pdf';
        pdfTitle.textContent = 'Detailed Resume';
    });

    standardResumeBtn.addEventListener('click', () => {
        pdfViewer.classList.remove('fade-in');
        pdfViewer.offsetWidth; // Trigger reflow
        pdfViewer.classList.add('fade-in');
        pdfViewer.src = 'resume-standard.pdf';
        pdfTitle.textContent = 'Standard Resume';
    });
});
