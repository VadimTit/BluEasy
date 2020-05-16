const element = document.getElementsByClassName("navbar-toggle");
element[0].addEventListener("click", function(event) {
  event.preventDefault();
  element[0].classList.toggle("is-active");
});

// @import "partials/app";