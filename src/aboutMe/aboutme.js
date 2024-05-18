function toggleMenu() {
    var nav = document.getElementById("navigationBar");
    var links = nav.querySelectorAll("a:not(.icon)");
    links.forEach(function (link) {
        link.style.display = link.style.display === "block" ? "none" : "block";
    });
}

// Adjust zoom level for larger screens (optional)
document.body.style.zoom = "100%";

// Define a list of phrases to type and delete
const phrases = [
    "Machine Learning Engineer",
    "Software Engineer",
    "Compiler Engineer",
    "Data Scientist"
];

// Access the span element where text will be displayed
const typedText = document.getElementById("typed-text");

let currentPhrase = 0; // Track the current phrase
let currentLetter = 0; // Track the current letter being typed
let typing = true; // Determines if we're typing or deleting

const typingSpeed = 40; // Speed of typing
const pauseDuration = 3000; // Duration to pause before deleting

// Function to type and delete text
function typeEffect() {
    if (typing) {
        if (currentLetter < phrases[currentPhrase].length) {
            // Add one letter at a time
            typedText.innerHTML += phrases[currentPhrase][currentLetter];
            currentLetter++;
            setTimeout(typeEffect, typingSpeed);
        } else {
            // Pause when the phrase is completely typed
            typing = false;
            setTimeout(typeEffect, pauseDuration);
        }
    } else {
        if (currentLetter > 0) {
            // Remove one letter at a time
            typedText.innerHTML = typedText.innerHTML.slice(0, -1);
            currentLetter--;
            setTimeout(typeEffect, typingSpeed);
        } else {
            // Move to the next phrase and start typing again
            typing = true;
            currentPhrase = (currentPhrase + 1) % phrases.length; // Loop back to the first phrase after the last one
            setTimeout(typeEffect, typingSpeed);
        }
    }
}

// Start the typing effect
setTimeout(typeEffect, typingSpeed);



// JavaScript to handle the theme toggle
document.addEventListener("DOMContentLoaded", function() {
    const body = document.body;
    const themeToggleBtn = document.getElementById("theme-toggle");

    if (body.classList.contains("dark-mode")) {
        themeToggleBtn.innerHTML = "Wanna see light?";
        themeToggleBtn.classList.add("dark-mode");
    } else {
        themeToggleBtn.innerHTML = "Get into darkness!";
        themeToggleBtn.classList.add("light-mode");
    }
});

document.getElementById("theme-toggle").addEventListener("click", function() {
    const body = document.body;
    const themeToggleBtn = document.getElementById("theme-toggle");

    if (body.classList.contains("light-mode")) {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
        themeToggleBtn.innerHTML = "Wanna see light?";
        themeToggleBtn.classList.remove("light-mode");
        themeToggleBtn.classList.add("dark-mode");
    } else {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        themeToggleBtn.innerHTML = "Get into darkness!";
        themeToggleBtn.classList.remove("dark-mode");
        themeToggleBtn.classList.add("light-mode");
    }
});



