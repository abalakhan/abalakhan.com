
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
         
//contact button functionality
document.querySelector('#contact').addEventListener('click', () => {
    document.querySelector('#floating-contact').classList.add('active');
}); 

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
