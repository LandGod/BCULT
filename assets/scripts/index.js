// Loads STMP.js from local file.
// Loading this way uses a promise to ensure that nothing else runs until that script is loaded
function loadEmailSubroutine() {
  return new Promise((resolve, reject) => {
    let scriptTag = document.createElement("script");
    scriptTag.type = "text/javascript";
    scriptTag.src = "./assets/scripts/smtp.js";

    scriptTag.onload = () => resolve(true);
    scriptTag.onerror = () => reject(error);
    document.getElementsByTagName("head")[0].appendChild(scriptTag);
  });
}

loadEmailSubroutine().then(main);

// Everthing other than the script for loading STMP.js is inside of this main function
function main() {
  // Email functionality
  function sendEmail(email, subject, body) {
    Email.send({
      Host: "smtp.gmail.com",
      Username: "bcultjoinerdaemon",
      Password: "bcult5ever",
      To: email,
      From: "bcultjoinerdaemon@gmail.com",
      Subject: subject,
      Body: body,
    }).then((message) => console.log(message));
  }

  let joinButtons = document.getElementsByClassName("join-button");

  // Clicking on a join button opens the popup (if it's not the popup's join button)
  for (let button of joinButtons) {
    if (button.id !== "popup-close-button") {
      button.addEventListener("click", openPopup);
    }
  }

  // ---------------------------------------------
  // Join Popup
  // ---------------------------------------------

  // Establish DOM Elements
  let popupContainer = document.getElementById("popup-container");
  let popupJoinButton = document.getElementById("popup-join-button");
  let popupNameField = document.getElementById("name-input");
  let popupEmailField = document.getElementById("email-input");
  let popupCloseButton = document.getElementById("popup-close-button");

  // Helper Functions

  function resetStyles() {
    popupNameField.className = "popup__form";
    popupEmailField.className = "popup__form";
    popupNameField.placeholder = "Name";
    popupEmailField.placeholder = "E-Mail";
  }

  function rejectName() {
    popupNameField.className = "popup__form popup__form--invalid";
    popupNameField.value = "";
    popupNameField.placeholder = "Please enter a valid name";
  }

  function rejectEmail() {
    popupEmailField.className = "popup__form popup__form--invalid";
    popupEmailField.value = "";
    popupEmailField.placeholder = "Please enter a valid E-Mail";
  }

  // Valid email address
  const validEmail = /^([A-Z]|[a-z]|-|_|[0-9]|\.)*@([a-z]|[A-Z]|[0-9])([a-z]|[A-Z]|-|[0-9]){0,61}([a-z]|[A-Z]|[0-9])\.([a-z]|[A-Z]|[0-9])([a-z]|[A-Z]|-|[0-9]){0,61}([a-z]|[A-Z]|[0-9])\.?(([a-z]|[A-Z]|[0-9])([a-z]|[A-Z]|-|[0-9]){0,61}([a-z]|[A-Z]|[0-9]))?$/;

  // Send Email
  function setJoinButtonListener(e) {
    e.preventDefault();
    let name = popupNameField;
    let userEmail = popupEmailField;

    resetStyles();

    if (!name.value) {
      rejectName();
    } else if (name.value.trim().length < 1) {
      rejectName();
    } else if (!userEmail.value) {
      rejectEmail();
    } else if (!userEmail.value.match(validEmail)) {
      rejectEmail();
    } else {
      console.log(
        "Email not sent because sending was disabled in the code due to still beinging in development"
      );
      // sendEmail(
      //   "tentativechaos@gmail.com",
      //   "A new user wants information about Bcult!",
      //   `Hi Ben! Someone new wants to join BCULT!\nName: ${name}\nE-mail: ${userEmail}`
      // );
    }
  }
  // Setup and Teardown
  function setListenersInPopup() {
    popupJoinButton.addEventListener("click", setJoinButtonListener);
    popupCloseButton.addEventListener("click", closePopup);
    popupContainer.addEventListener("click", closePopup);
  }

  function removeListenersInPopup() {
    popupJoinButton.removeEventListener("click", setJoinButtonListener);
    popupCloseButton.removeEventListener("click", closePopup);
  }

  // Open Popup
  function openPopup(e) {
    e.preventDefault();
    popupContainer.className = "popup__background--open";
    setListenersInPopup();
  }

  // Close Popup
  function closePopup(e) {
    e.preventDefault();
    if (e.target === popupContainer || e.currentTarget === popupCloseButton) {
      popupContainer.className = "popup__background--closed";
      removeListenersInPopup();
    }
  }
}
