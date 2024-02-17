// document.addEventListener('DOMContentLoaded', function() {
//     const slider = document.getElementById("slider");

//     function activate(e) {
//       const items = document.querySelectorAll('.item');
//       e.target.matches('.next') && slider.append(items[0]);
//       e.target.matches('.prev') && slider.prepend(items[items.length - 1]);
//     }

//     document.addEventListener('click', activate, false);
//   });
// //////////////////////////////////////////////////////////////////////////////////////////////
//   document.addEventListener('DOMContentLoaded', function() {
//     const slider = document.getElementById("slider");

    
//       const items = document.querySelectorAll('.item');
//       e.target.matches('.next') && slider.append(items[0]);
//       e.target.matches('.prev') && slider.prepend(items[items.length - 1]);
    
//   });

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById("slider");
    const items = document.querySelectorAll('.item');
    let currentIndex = 0;

    function showSlide(index) {
      slider.append(items[index]);
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % items.length;
      showSlide(currentIndex);
    }

    function autoSlide() {
      nextSlide();
    }

    // Set interval for auto-slide (adjust the interval time as needed)
    const autoSlideInterval = setInterval(autoSlide, 2000);

    document.querySelector('.slider').addEventListener('onload', function(e) {
      nextSlide();
    });
  });