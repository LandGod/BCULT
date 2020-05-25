import Email from "./smtp";

// Email send
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

const joinButton = document.getElementsByClassName("join-button");

// Just for testing
const testData = {
  email: "tentativechaos@gmail.com",
  subject: "Test Email from BCULT",
  body: "This is the test email from BCULT. Testing, testing, testing.",
};

// Click even for join buttons
joinButton.addEventListener("click", sendEmail(...testData));
