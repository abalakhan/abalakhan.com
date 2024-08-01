//init floating button
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
      direction: 'up',
      hoverEnabled: false
    });
});

//init mobile menu
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {
        draggable: true
    });
  });
         
//textarea functionality
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('input#input_text, textarea#textarea');
  var instances = M.CharacterCounter.init(elems);
});

//autoresize
textarea = document.querySelector("#textarea");
textarea.addEventListener('input', autoResize, false);

function autoResize() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
}

//tooltip functionality 
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.tooltipped');
  var instances = M.Tooltip.init(elems, {
    transitionMovement: 5,
    
  });
});

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('contact-form');
  const fullname = document.getElementById('name');
  const email = document.getElementById('email');
  const subject = document.getElementById('subject');
  const message = document.getElementById('textarea');

  // Fetch environment variables from the server
  let secureToken, senderEmail, receiverEmail;
  try {
    const configResponse = await fetch('/config');
    const configData = await configResponse.json();
    secureToken = configData.secureToken;
    senderEmail = configData.senderEmail;
    receiverEmail = configData.receiverEmail;
  } catch (error) {
    console.error('Failed to load configuration', error);
  }

  function checkInputs() {
    const items = document.querySelectorAll('.item');
    let valid = true;

    items.forEach(item => {
      if (item.value.trim() === "") {
        item.classList.add("error");
        item.parentElement.classList.add("error");
        valid = false;
      } else {
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
      }

      item.addEventListener("input", () => {
        if (item.value.trim() !== "") {
          item.classList.remove("error");
          item.parentElement.classList.remove("error");
        } else {
          item.classList.add("error");
          item.parentElement.classList.add("error");
        }
      });
    });
    return valid;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (checkInputs()) {
      Email.send({
        SecureToken: secureToken, // Use the fetched API key from environment variables
        To: receiverEmail, // Use the fetched receiver email address
        From: senderEmail, // Use the fetched sender email address
        Subject: `abalakhan.com | ${subject.value}`,
        Body: `Name: ${fullname.value}<br> Email: ${email.value}<br> Message: ${message.value}`
      })
      .then((response) => {
        if (response === 'OK') {
          Swal.fire({
            title: "Thank you!",
            text: "Your message was successfully submitted.",
            icon: "success"
          });
          form.reset();
        } else {
          Swal.fire({
            title: "Error!",
            text: response,
            icon: "error"
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: "Failed to send message.",
          icon: "error"
        });
      });
    }
  });
});

// back to the top function
const showOnPx = 100;
const backToTopButton = document.querySelector(".back-to-top");
const pageProgressBar = document.querySelector(".progress-bar");

const scrollContainer = () => {
  return document.documentElement || document.body;
};

const goToTop = () => {
  document.body.scrollIntoView({
    behavior: "smooth"
  });
};

document.addEventListener("scroll", () => {
  // console.log("Scroll Height: ", scrollContainer().scrollHeight);
  // console.log("Client Height: ", scrollContainer().clientHeight);

  const scrolledPercentage =
    (scrollContainer().scrollTop /
      (scrollContainer().scrollHeight - scrollContainer().clientHeight)) *
    100;

  pageProgressBar.style.width = `${scrolledPercentage}%`;

  if (scrollContainer().scrollTop > showOnPx) {
    backToTopButton.classList.remove("hidden");
  } else {
    backToTopButton.classList.add("hidden");
  }
});

backToTopButton.addEventListener("click", goToTop);

// theme switcher
const heroWindow = document.querySelector('.pop-over');
const checkbox = document.getElementById("checkbox");

checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  backToTopButton.classList.add("dark-popover");
})

// Function to apply the dark theme
function applyDarkTheme(isDark) {
  if (isDark) {
    document.body.classList.add("dark");
    heroWindow.classList.add("dark-popover");
    checkbox.checked = true;
  } else {
    document.body.classList.remove("dark");
    heroWindow.classList.remove("dark-popover");
    checkbox.checked = false;
  }
}

// Check for system preference
const systemPreference = window.matchMedia('(prefers-color-scheme: dark)');
applyDarkTheme(systemPreference.matches);

// Listen for system preference changes
systemPreference.addEventListener('change', (e) => {
  applyDarkTheme(e.matches);
});

// preloader func
let box = document.querySelector("#preloader"),
	btn = document.querySelector("#skip");

function fadeOut() {
	box.classList.add("visuallyhidden");
	box.addEventListener(
		"transitionend",
		function (e) {
			box.classList.add("hidden");
		},
		{
			capture: false,
			once: true,
			passive: false
		}
	);
}

// btn.addEventListener("click", fadeOut, false);
setTimeout(fadeOut, 2500);