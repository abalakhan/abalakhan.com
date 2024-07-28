const SECURITY_TOKEN = process.env.SECURITY_TOKEN;
const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL;
const SENDER_EMAIL = process.env.SENDER_EMAIL;


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

//form functionality
const form = document.querySelector('form');
const fullname = document.getElementById('name');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const message = document.getElementById('textarea');

function sendEmail() {
  const subjectMessage = `abalakhan.com | ${subject.value}`;
  const bodyMessage = `Name: ${fullname.value}<br> Email: ${email.value}<br> Message: ${message.value}`;

  Email.send({
    SecureToken : SECURITY_TOKEN,
    To : RECEIVER_EMAIL,
    From : SENDER_EMAIL,
    Subject : subjectMessage,
    Body : bodyMessage
}).then(
  message => {
    if (message == "OK") {
      Swal.fire({
        title: "Thank you!",
        text: "Your message was successfully submitted.",
        icon: "success"
      });
    }
  }
); 
}

function checkInputs() {
  const items = document.querySelectorAll('.item');

  for (const item of items) {
    if (item.value == "") {
      item.classList.add("error");
      item.parentElement.classList.add("error");
    } 

    item.addEventListener("keyup", () => {
      if (item.vallue != "") {
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
      } else {
        item.classList.add("error");
        item.parentElement.classList.add("error");
      }
    });
  }
}


form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();

  if(!fullname.classList.contains("error") && !email.classList.contains("error") && !subject.classList.contains("error") && !message.classList.contains("error")) {
    sendEmail();
    
    form.reset();
    return false;
  }
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
  console.log("Scroll Height: ", scrollContainer().scrollHeight);
  console.log("Client Height: ", scrollContainer().clientHeight);

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
const checkbox = document.getElementById("checkbox")
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  backToTopButton.classList.add("dark-popover");
})

// preloader func
// let box = document.querySelector("#preloader"),
// 	btn = document.querySelector("#skip");

// function fadeOut() {
// 	box.classList.add("visuallyhidden");
// 	box.addEventListener(
// 		"transitionend",
// 		function (e) {
// 			box.classList.add("hidden");
// 		},
// 		{
// 			capture: false,
// 			once: true,
// 			passive: false
// 		}
// 	);
// }

// btn.addEventListener("click", fadeOut, false);
// setTimeout(fadeOut, 3000);
