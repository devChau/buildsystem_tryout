// Based on the MDN add to home screen example
// Github: https://github.com/mdn/pwa-examples/tree/master/a2hs
// Article: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Add_to_home_screen
const addBtn = document.querySelector(".js-a2hs-btn");

// Install the service worker in case it's supported

if ("serviceWorker" in navigator) {
  // env vars are merged via babel script
  navigator.serviceWorker.register(process.env.SW_FILE_PATH);
}

export default function initialize() {
  window.addEventListener("beforeinstallprompt", (event) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    event.preventDefault();

    // Stash the event so it can be triggered later.
    let deferredPrompt = event;

    // Update UI to notify the user they can add to home screen
    addBtn.style.display = "block";

    addBtn.addEventListener("click", () => {
      // hide our user interface that shows our A2HS button
      addBtn.style.display = "none";

      // Show the prompt
      deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        // When the user accepted to add the app
        // to the home screen, hide the add button.
        // If they didn't add it, show the add button.
        if (choiceResult.outcome === "accepted") {
          addBtn.style.display = "none";
        } else {
          addBtn.style.display = "block";
        }
      });
    });
  });
}
