document.addEventListener("DOMContentLoaded", () => {
    const typingElements = document.querySelectorAll(".typing");

    typingElements.forEach((typingElement) => {
        let messages;
        let msgIndex = 0;
        let charIndex = 0;
        let deleting = false;
        let cursorInterval;

        const colors = ["#ff9800", "#ff5252", "#40c4ff", "#69f0ae", "#ffd740", "#b388ff"];

        // assign messages
        if (typingElement.id === "spec") {
            messages = ["Welcome!", "Have a nice stay!", "Enjoy!"];
        } else {
            messages = [typingElement.innerText]; // wrap in array
        }

        typingElement.innerText = ""; // clear text for animation
        typingElement.style.borderRight = "2px solid white";

        function startCursorBlink() {
            cursorInterval = setInterval(() => {
                typingElement.style.borderRight =
                    typingElement.style.borderRight === "2px solid white"
                        ? "2px solid transparent"
                        : "2px solid white";
            }, 500);
        }

        function stopCursorBlink() {
            clearInterval(cursorInterval);
            typingElement.style.borderRight = "2px solid white";
        }

        function type() {
            const currentMsg = messages[msgIndex]; // pick active message

            if (!deleting) {
                typingElement.innerHTML = currentMsg.slice(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentMsg.length) {
                    startCursorBlink();
                    deleting = true;
                    setTimeout(type, 2000); // pause before deleting
                    return;
                }
            } else {
                stopCursorBlink();
                typingElement.innerHTML = currentMsg.slice(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    deleting = false;
                    msgIndex = (msgIndex + 1) % messages.length; // go to next

                    // pick random color
                    if (typingElement.classList.contains("colored")) {
                        typingElement.style.color = colors[Math.floor(Math.random() * colors.length)]
                    }
                }
            }

            setTimeout(type, deleting ? 50 : 100);
        }

        if (typingElement.classList.contains("colored")) {
            typingElement.style.color = colors[Math.floor(Math.random() * colors.length)]
        }
        
        type();
    });
});