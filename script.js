const addActiveLinkToMenu = () =>{
    const MENU = document.getElementById("menu");

    MENU.addEventListener("click", (event) => {
      MENU.querySelectorAll('.header__list-link').forEach((element)=>{
        element.classList.remove('header__list-link-selected');   
      });
      event.target.classList.add('header__list-link-selected')
    });
}

const addSlider = () =>{
  const SLIDETIME = 500; //ms
  // --------------------------
  const SLIDER = document.getElementById('slider');
  const backButton = SLIDER.querySelector('.slider__left-arrow');
  const forwardButton = SLIDER.querySelector('.slider__right-arrow');
  // Select all slides and convert node to array for easy handling
  // const allSlides = Array.from(document.querySelectorAll('.wbn-slide'));
  const allSlides = [...SLIDER.querySelectorAll('.slider__slide')];
  let clickable = true;
  let active = null;
  let newActive = null;
  
  function initSlider() {
    // Set the CSS transition on the slides to the value we specified in SLIDETIME above
    allSlides.forEach(slide =>
      slide.setAttribute(
        'style',
        `transition: transform ${SLIDETIME}ms ease;
                     animation-duration: ${SLIDETIME}ms`,
      ),
    );
  }

  function changeSlide(forward) {
    if (clickable) {
      clickable = false;
      active = SLIDER.querySelector('.active');
      const activeSlideIndex = allSlides.indexOf(active);

      if (forward) {
        newActive = allSlides[(activeSlideIndex + 1) % allSlides.length];
        active.classList.add('slideOutLeft');
        newActive.classList.add('slideInRight', 'active');
      } else {
        newActive =
          allSlides[
            (activeSlideIndex - 1 + allSlides.length) % allSlides.length
          ];
        active.classList.add('slideOutRight');
        newActive.classList.add('slideInLeft', 'active');
      }
    }
  }
  
  allSlides.forEach(slide => {
    slide.addEventListener('transitionend', e => {
      // Check for the old active transition and if clickable is false
      // to not trigger it more than once
      if (slide === active && !clickable) {
        clickable = true;
        // Remove all CSS animation classes on old active
        active.className = 'slider__slide';
      }
    });
  });
  
  //Event listeners
  forwardButton.addEventListener('click', () => {
    changeSlide(true);
  });
  backButton.addEventListener('click', () => {
    changeSlide(false);
  });

  // Init the slider
  initSlider();

  const horizontalMobile = SLIDER.querySelector('.slide__horizontal-mobile-content');
  const verticalMobile = SLIDER.querySelector('.slide__vertical-mobile-content');
  horizontalMobile.addEventListener('click',(event)=>{
    if(event.target.style.backgroundImage ==='none'){
      event.target.style.backgroundImage = "url('assets/images/Horizontal-Image.png')";
    }else{
      event.target.style.backgroundImage ='none';
    }
  });
  verticalMobile.addEventListener('click',(event)=>{
    if(event.target.style.backgroundImage ==='none'){
      event.target.style.backgroundImage = "url('assets/images/Vertical-Image.png')";
    }else{
      event.target.style.backgroundImage ='none';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Header menu
  addActiveLinkToMenu();

  // Slider
  addSlider();
  
  
});