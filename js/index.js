document.addEventListener('DOMContentLoaded', function() {
  // Initialize Materialize components
  initializeMaterializeComponents();

  // Form functionality
  const form = document.querySelector('form');
  form.addEventListener("submit", handleSubmit);

  // Back to top functionality
  setupBackToTopButton();

  // Theme switcher
  setupThemeSwitcher();
});

function initializeMaterializeComponents() {
  // Initialize floating button
  M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'), {
      direction: 'up',
      hoverEnabled: false
  });

  // Initialize mobile menu
  M.Sidenav.init(document.querySelectorAll('.sidenav'), {
      draggable: true
  });

  // Initialize textarea functionality
  M.CharacterCounter.init(document.querySelectorAll('input#input_text, textarea#textarea'));

  // Initialize tooltip functionality 
  M.Tooltip.init(document.querySelectorAll('.tooltipped'), {
      transitionMovement: 5
  });

  // Initialize autoresize for textarea
  document.querySelector("#textarea").addEventListener('input', autoResize);
}

function autoResize() {
  this.style.height = 'auto';
  this.style.height = this.scrollHeight + 'px';
}

function handleSubmit(event) {
  event.preventDefault();
  checkInputs();

  const fullname = document.getElementById('name');
  const email = document.getElementById('email');
  const subject = document.getElementById('subject');
  const message = document.getElementById('textarea');

  if (!hasErrors([fullname, email, subject, message])) {
      sendEmail(fullname.value, email.value, subject.value, message.value);
      event.target.reset();
  }
}

function sendEmail(name, email, subject, message) {
  const subjectMessage = `abalakhan.com | ${subject}`;
  const bodyMessage = `Name: ${name}<br> Email: ${email}<br> Message: ${message}`;

  Email.send({
      SecureToken: window.env.securityToken,
      To: "receiver@example.com", // Update with actual receiver email
      From: window.env.senderEmail,
      Subject: subjectMessage,
      Body: bodyMessage
  }).then(
      response => {
          if (response === "OK") {
              Swal.fire({
                  title: "Thank you!",
                  text: "Your message was successfully submitted.",
                  icon: "success"
              });
          }
      }
  ).catch(
      error => alert('Failed to send email: ' + error)
  );
}

function checkInputs() {
  document.querySelectorAll('.item').forEach(item => {
      item.classList.toggle("error", item.value === "");
      item.parentElement.classList.toggle("error", item.value === "");

      item.addEventListener("keyup", () => {
          item.classList.toggle("error", item.value === "");
          item.parentElement.classList.toggle("error", item.value === "");
      });
  });
}

function hasErrors(elements) {
  return elements.some(element => element.classList.contains("error"));
}

function setupBackToTopButton() {
  const showOnPx = 100;
  const backToTopButton = document.querySelector(".back-to-top");
  const pageProgressBar = document.querySelector(".progress-bar");

  document.addEventListener("scroll", () => {
      const scrollContainer = document.documentElement || document.body;
      const scrolledPercentage = (scrollContainer.scrollTop / (scrollContainer.scrollHeight - scrollContainer.clientHeight)) * 100;

      pageProgressBar.style.width = `${scrolledPercentage}%`;

      backToTopButton.classList.toggle("hidden", scrollContainer.scrollTop <= showOnPx);
  });

  backToTopButton.addEventListener("click", () => {
      document.body.scrollIntoView({ behavior: "smooth" });
  });
}

function setupThemeSwitcher() {
  const checkbox = document.getElementById("checkbox");
  checkbox.addEventListener("change", () => {
      document.body.classList.toggle("dark");
      document.querySelector(".back-to-top").classList.add("dark-popover");
  });
}