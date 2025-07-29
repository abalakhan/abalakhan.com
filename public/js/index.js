document.addEventListener("DOMContentLoaded", function () {
  // Floating button
  var fabElems = document.querySelectorAll('.fixed-action-btn');
  M.FloatingActionButton.init(fabElems, {
    direction: 'up',
    hoverEnabled: false
  });

  // Mobile menu
  var sidenavElems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sidenavElems, {
    draggable: true
  });

  // Textarea character counter
  var charElems = document.querySelectorAll('input#input_text, textarea#textarea');
  M.CharacterCounter.init(charElems);

  // Tooltip
  var tooltipElems = document.querySelectorAll('.tooltipped');
  M.Tooltip.init(tooltipElems, {
    transitionMovement: 5
  });

  // Autoresize
  var textarea = document.querySelector("#textarea");
  if (textarea) {
    textarea.addEventListener('input', function autoResize() {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
    }, false);
  }

  // Contact form functionality
  const form = document.getElementById('contact-form');
  if (form) {
    const fullname = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('textarea');

    // Fetch environment variables from the server
    let secureToken, senderEmail, receiverEmail;
    fetch('/config')
      .then(res => res.json())
      .then(configData => {
        secureToken = configData.secureToken;
        senderEmail = configData.senderEmail;
        receiverEmail = configData.receiverEmail;
      })
      .catch(error => {
        console.error('Failed to load configuration', error);
      });

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
          SecureToken: secureToken,
          To: receiverEmail,
          From: senderEmail,
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
  }

  // Back to the top function
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

  if (backToTopButton && pageProgressBar) {
    document.addEventListener("scroll", () => {
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
  }

  // Dark mode
  const heroWindow = document.querySelector('.pop-over');
  const checkbox = document.getElementById("checkbox");

  function applyDarkTheme(isDark) {
    if (isDark) {
      document.body.classList.add("dark");
      if (heroWindow) heroWindow.classList.add("dark-popover");
      if (checkbox) checkbox.checked = true;
    } else {
      document.body.classList.remove("dark");
      if (heroWindow) heroWindow.classList.remove("dark-popover");
      if (checkbox) checkbox.checked = false;
    }
  }

  // Check for system preference
  const systemPreference = window.matchMedia('(prefers-color-scheme: dark)');
  applyDarkTheme(systemPreference.matches);

  // Listen for system preference changes
  systemPreference.addEventListener('change', (e) => {
    applyDarkTheme(e.matches);
  });

  if (checkbox) {
    checkbox.addEventListener("change", () => {
      document.body.classList.toggle("dark");
      if (heroWindow) heroWindow.classList.toggle("dark-popover");
    });
  }

  // Preloader func
  let box = document.querySelector("#preloader"),
      btn = document.querySelector("#skip");

  function fadeOut() {
    if (box) {
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
  }

  setTimeout(fadeOut, 10);
});