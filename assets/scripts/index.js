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

function main() {
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

  // Just for testing
  const testData = {
    email: "tentativechaos@gmail.com",
    subject: "Test Email from BCULT",
    body: "This is the test email from BCULT. Testing, testing, testing.",
  };

  // Click even for join buttons
  for (let button of joinButtons) {
    button.addEventListener("click", () => {
      sendEmail(
        "tentativecahos@gmail.com",
        "Test Email from BCULT",
        "This is the test email from BCULT. Testing, testing, testing."
      );
    });
  }
}
