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
  let popupTitle = document.getElementById("popup-title");
  let popupJoinButton = document.getElementById("popup-join-button");
  let popupNameField = document.getElementById("name-input");
  let popupEmailField = document.getElementById("email-input");
  let popupText = document.getElementById("popup-text");
  let popupCloseButton = document.getElementById("popup-close-button");
  let svgBackArrow = `<svg
    width="14"
    height="10"
    viewBox="0 0 14 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask id="path-1-inside-1" fill="white">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.19479 10L14 4.99887L12.8266 3.77758L12.8255 3.77871L9.19481 9.95683e-06L8.02136 1.2213L10.8139 4.12771L1.28381e-05 4.12771L1.28382e-05 4.12891L4.40407e-07 4.12891L-6.56512e-08 9.24904L1.72245 9.24904L1.72245 5.85487L10.8306 5.85487L8.02135 8.77871L9.19479 10Z"
      />
    </mask>
    <path
      d="M14 4.99887L16.1633 7.07739L18.1604 4.99887L16.1633 2.92034L14 4.99887ZM9.19479 10L7.03152 12.0785L9.19479 14.33L11.3581 12.0785L9.19479 10ZM12.8266 3.77758L14.9898 1.69906L12.8264 -0.552551L10.6632 1.69919L12.8266 3.77758ZM12.8255 3.77871L10.6622 5.85723L12.8256 8.10884L14.9889 5.8571L12.8255 3.77871ZM9.19481 9.95683e-06L11.3581 -2.07851L9.19481 -4.32999L7.03154 -2.07851L9.19481 9.95683e-06ZM8.02136 1.2213L5.85809 -0.857228L3.861 1.2213L5.85809 3.29982L8.02136 1.2213ZM10.8139 4.12771L10.8139 7.12771L17.8568 7.12771L12.9772 2.04919L10.8139 4.12771ZM1.28381e-05 4.12771L1.25758e-05 1.12771L-2.99999 1.12771L-2.99999 4.12771L1.28381e-05 4.12771ZM1.28382e-05 4.12891L1.31004e-05 7.12891L3.00001 7.12891L3.00001 4.12891L1.28382e-05 4.12891ZM4.40407e-07 4.12891L1.78139e-07 1.12891L-3 1.12891L-3 4.12891L4.40407e-07 4.12891ZM-6.56512e-08 9.24904L-3 9.24904L-3 12.249L1.96617e-07 12.249L-6.56512e-08 9.24904ZM1.72245 9.24904L1.72245 12.249L4.72245 12.249L4.72245 9.24904L1.72245 9.24904ZM1.72245 5.85487L1.72245 2.85487L-1.27755 2.85487L-1.27755 5.85487L1.72245 5.85487ZM10.8306 5.85487L12.9939 7.93339L17.8735 2.85487L10.8306 2.85487L10.8306 5.85487ZM8.02135 8.77871L5.85807 6.70019L3.86098 8.77872L5.85808 10.8572L8.02135 8.77871ZM11.8367 2.92034L7.03152 7.92148L11.3581 12.0785L16.1633 7.07739L11.8367 2.92034ZM10.6633 5.8561L11.8367 7.07739L16.1633 2.92034L14.9898 1.69906L10.6633 5.8561ZM14.9889 5.8571L14.99 5.85597L10.6632 1.69919L10.6621 1.70031L14.9889 5.8571ZM7.03154 2.07853L10.6622 5.85723L14.9887 1.70018L11.3581 -2.07851L7.03154 2.07853ZM10.1846 3.29982L11.3581 2.07853L7.03154 -2.07851L5.85809 -0.857228L10.1846 3.29982ZM12.9772 2.04919L10.1846 -0.857228L5.85809 3.29982L8.65065 6.20624L12.9772 2.04919ZM1.31003e-05 7.12771L10.8139 7.12771L10.8139 1.12771L1.25758e-05 1.12771L1.31003e-05 7.12771ZM3.00001 4.12891L3.00001 4.12771L-2.99999 4.12771L-2.99999 4.12891L3.00001 4.12891ZM7.02675e-07 7.12891L1.31004e-05 7.12891L1.25759e-05 1.12891L1.78139e-07 1.12891L7.02675e-07 7.12891ZM3 9.24904L3 4.12891L-3 4.12891L-3 9.24904L3 9.24904ZM1.72245 6.24904L-3.27919e-07 6.24904L1.96617e-07 12.249L1.72245 12.249L1.72245 6.24904ZM-1.27755 5.85487L-1.27755 9.24904L4.72245 9.24904L4.72245 5.85487L-1.27755 5.85487ZM10.8306 2.85487L1.72245 2.85487L1.72245 8.85487L10.8306 8.85487L10.8306 2.85487ZM10.1846 10.8572L12.9939 7.93339L8.66738 3.77635L5.85807 6.70019L10.1846 10.8572ZM11.3581 7.92148L10.1846 6.70019L5.85808 10.8572L7.03152 12.0785L11.3581 7.92148Z"
      fill="black"
      mask="url(#path-1-inside-1)"
    />
  </svg>`;

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

  // Validate Input and Send Email (if input is valid)
  function joinButtonClickFunction(e) {
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
      // Remove ability to send again:
      popupJoinButton.removeEventListener("click", joinButtonClickFunction);
      // Inform user of success
      joinSuccess();
      // sendEmail(
      //   "tentativechaos@gmail.com",
      //   "A new user wants information about Bcult!",
      //   `Hi Ben! Someone new wants to join BCULT!\nName: ${name}\nE-mail: ${userEmail}`
      // );
    }
  }

  // Setup and Teardown
  function setListenersInPopup() {
    popupJoinButton.addEventListener("click", joinButtonClickFunction);
    popupCloseButton.addEventListener("click", closePopup);
    popupContainer.addEventListener("click", closePopup);
  }

  function removeListenersInPopup() {
    popupJoinButton.removeEventListener("click", joinButtonClickFunction);
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
    } else if (e.target === popupJoinButton) {
      let currentStatus = popupJoinButton.getAttribute("status");
      if (currentStatus === "exit") {
        popupContainer.className = "popup__background--closed";
        removeListenersInPopup();
      }
    }
  }

  // Success Feedback
  function joinSuccess() {
    // Change element look
    popupTitle.innerHTML =
      "Thank you for joining<br/><span class='popup__title--highlight'>Bcult</span>";
    popupText.remove();
    popupEmailField.remove();
    popupNameField.remove();
    popupJoinButton.innerHTML = `GO BACK ${svgBackArrow}`;

    // Add close listener to what used to be the join button
    popupJoinButton.addEventListener("click", closePopup);
    // Using set timeout to avoid race condition where popup just closes as soon as join is pressed
    setTimeout(() => {
      popupJoinButton.setAttribute("status", "exit");
    });
  }
}
