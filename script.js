const MENU = document.getElementById("menu");

MENU.addEventListener("click", (event) => {
  MENU.querySelectorAll('.header__list-link').forEach((element)=>{
    element.classList.remove('header__list-link-selected');   
  });
  event.target.classList.add('header__list-link-selected')
});

