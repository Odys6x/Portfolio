

function  Typing   () {
const dynamicText = document.querySelector("h2 span");
const words = ["a Programmer", "an AI Specialist", "a Gamer"];
// Variables to track the position and deletion status of the word
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeEffect = () => {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    dynamicText.textContent = currentChar;
    dynamicText.classList.add("stop-blinking");
    if (!isDeleting && charIndex < currentWord.length) {
        // If condition is true, type the next character
        charIndex++;
        setTimeout(typeEffect, 200);
    } else if (isDeleting && charIndex > 0) {
        // If condition is true, remove the previous character
        charIndex--;
        setTimeout(typeEffect, 100);
    } else {
        // If word is deleted then switch to the next word
        isDeleting = !isDeleting;
        dynamicText.classList.remove("stop-blinking");
        wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
        setTimeout(typeEffect, 1200);
    }
}

    return(
        <>
        
        <section id="hero" class="d-flex flex-column justify-content-center align-items-center">
        <div class="hero-container" data-aos="fade-in">
        <h1>Wong Chun Owen</h1>
        <h2 id="me">I'm <span></span></h2>
        </div>
        </section>
        </>
    

    
    )
}

export default Typing