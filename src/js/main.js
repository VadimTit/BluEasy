// burger

const element = document.getElementsByClassName("navbar-toggle");
element[0].addEventListener("click", function(event) {
  event.preventDefault();
  element[0].classList.toggle("is-active");
});


//  STICKY HEADER

// When the user scrolls the page, execute myFunction 
window.onscroll = function() {myFunction()};

// Get the header
var header = document.getElementById("myHeader");

// Get the offset position of the navbar
var sticky = header.offsetTop;
// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

// anchor

$(function(){
  $('a[href^="#"]').on('click', function(event) {
    // отменяем стандартное действие
    event.preventDefault();
    
    var sc = $(this).attr("href"),
        dn = $(sc).offset().top;
    /*
    * sc - в переменную заносим информацию о том, к какому блоку надо перейти
    * dn - определяем положение блока на странице
    */
    
    $('html, body').animate({scrollTop: dn}, 1200);
    
    /*
    * 1000 скорость перехода в миллисекундах
    */
  });
});

// TABS
$(function(){

  $('.tab-title li').not('.active').click(function(){
      var index = $(this).index();
      var content = $('.tab-content li').eq(index);
      $(this).addClass('active').siblings().removeClass('active');
      $('.tab-content li').css('display', 'none').eq(index).css('display', 'block');
  })
  
      $('.tab-title li:first').addClass('active');
      $('.tab-content li:first').css('display', 'block');
  
  })
// @import "partials/app";