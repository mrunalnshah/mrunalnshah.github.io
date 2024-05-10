function toggleMenu() {
    var nav = document.getElementById("navigationBar");
    var links = nav.querySelectorAll("a:not(.icon)");
    links.forEach(function(link) {
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



// Get the checkbox input element
const checkbox = document.getElementById("checkbox");

// Get the body element to change the theme class
const body = document.body;

// Function to toggle between light and dark mode
function toggleTheme() {
  if (checkbox.checked) {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
  }
}

// Attach the toggle function to the checkbox's change event
checkbox.addEventListener("change", toggleTheme);

// Ensure the initial checkbox state matches the current theme
checkbox.checked = body.classList.contains("dark-mode");


