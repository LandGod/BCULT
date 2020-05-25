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

  // Click event for join buttons
  for (let button of joinButtons) {
    // TODO: REMOVE THIS TEST DATA!!
    button.addEventListener("click", () => {
      sendEmail(
        "tentativechaos@gmail.com",
        "Test Email from BCULT",
        "This is the test email from BCULT. Testing, testing, testing."
      );
    });
  }

  // Join info popup

}
