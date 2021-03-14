
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
  window.addEventListener('scroll', animOnScroll);
  function animOnScroll(params) {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;


      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }


      if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
        animItem.classList.add('_active');
      } else {
        animItem.classList.remove('_active');
      }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }
  animOnScroll();

  setTimeout(() => {
    animOnScroll();
  }, 300);
}



let total_pics_num = 4; // колличество изображений
let interval = 5000;    // задержка между изображениями
let time_out = 1;       // задержка смены изображений
let i = 0;
let timeout;
let opacity = 100;
function fade_to_next() {
  opacity--;
  let k = i + 1;
  let image_now = 'image_' + i;
  if (i == total_pics_num) k = 1;
  let image_next = 'image_' + k;
  const imageNow = document.getElementById(image_now);
  imageNow.style.opacity = opacity / 100;
  imageNow.style.filter = 'alpha(opacity=' + opacity + ')';
  document.getElementById(image_next).style.opacity = (100 - opacity) / 100;
  document.getElementById(image_next).style.filter = 'alpha(opacity=' + (100 - opacity) + ')';
  timeout = setTimeout("fade_to_next()", time_out);
  if (opacity == 1) {
    opacity = 100;
    clearTimeout(timeout);
  }
}
setInterval(
  function () {
    i++;
    if (i > total_pics_num) i = 1;
    fade_to_next();
  }, interval
);


let scrollHeight = 605;
const headerLinks = document.getElementById('header-link');

const scrollHandler = (event) => {
  switch (event.target.id) {
    case 'header-link__about-me': {
      scrollHeight = 605;
      break;
    }
    case 'header-link__contacts': {
      scrollHeight = 1210;
      break;
    }
    case 'header-link__contacts': {
      scrollHeight = 1210;
      break;
    }
    default: {
      scrollHeight = null;
    }
  }

  if (scrollHeight !== null) {
    window.scrollTo({
      top: scrollHeight,
      behavior: "smooth"
    });
  }
}

headerLinks.addEventListener('click', scrollHandler);