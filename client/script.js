const animateText = () => {
  const animItems = document.querySelectorAll('.animated-item');

  if (animItems && animItems.length) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
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
          animItem.classList.add('animation-active');
        } else {
          animItem.classList.remove('animation-active');
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
  }
}

const imageCarousel = () => {
  const interval = 5000;    // задержка между изображениями
  const timeout = 1;       // задержка смены изображений
  let index = 0;
  let timeoutTimer;
  let opacity = 100;

  const imageNames = [
    'hockey-player',
    'ice-hockey-player',
    'player-congratulations',
    'happy-player'
  ];
  const totalImagesLength = imageNames.length;

  function fadeToNext() {
    let nextIndex = index + 1;
    opacity--;

    if (index == totalImagesLength - 1) {
      nextIndex = 0;
    }

    const currentImageName = imageNames[index];
    const currentImage = document.getElementById(currentImageName);
    if (currentImage) {
      currentImage.style.opacity = opacity / 100;
      currentImage.style.filter = 'alpha(opacity=' + opacity + ')';
    }

    const nextImageName = imageNames[nextIndex];
    const nextImage = document.getElementById(nextImageName);
    if (nextImage) {
      nextImage.style.opacity = (100 - opacity) / 100;
      nextImage.style.filter = 'alpha(opacity=' + (100 - opacity) + ')';
    }

    timeoutTimer = setTimeout(() => fadeToNext(), timeout);

    if (opacity == 1) {
      opacity = 100;
      clearTimeout(timeoutTimer);
    }
  }

  setInterval(() => {
    index++;

    if (index > totalImagesLength - 1) {
      index = 0;
    }
    fadeToNext();
  }, interval);
}

const linksNavigator = () => {
  const headerLinks = document.getElementById('header-links');
  const firstScreen = document.getElementById('first-screen-id').offsetHeight;
  const aboutMeScreen = document.getElementById('about-me-screen-id').offsetHeight;
  const trainingScreen = document.getElementById('training-screen-id').offsetHeight;
  const priceScreen = document.getElementById('price-screen-id').offsetHeight;

  const screenHeights = {
    aboutMe: firstScreen,
    training: firstScreen + aboutMeScreen,
    price: firstScreen + aboutMeScreen + trainingScreen,
    contacts: firstScreen + aboutMeScreen + trainingScreen + priceScreen,
  }

  const scrollHandler = (event) => {
    let scrollHeight = 0;

    switch (event.target.id) {
      case 'header-link__about-me': {
        scrollHeight = screenHeights.aboutMe;
        break;
      }
      case 'header-link__training': {
        scrollHeight = screenHeights.training;
        break;
      }
      case 'header-link__price': {
        scrollHeight = screenHeights.price;
        break;
      }
      case 'header-link__contacts': {
        scrollHeight = screenHeights.contacts;
        break;
      }
      default: {
        scrollHeight = null;
      }
    }

    if (scrollHeight !== null) {
      window.scrollTo({
        top: scrollHeight,
        behavior: "smooth",
      });
    }
  }

  headerLinks.addEventListener('click', scrollHandler);
}

const burgerMenu = (selector) => {
  let menu = document.querySelector(selector);
  let button = menu.querySelector('.burger-menu_button', '.burger-menu_lines');
  let links = menu.querySelectorAll('.burger-menu_link');
  let overlay = menu.querySelector('.burger-menu_overlay');

  button.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu();
  });

  Array.from(links).forEach((link) => {
    link.addEventListener('click', () => toggleMenu());
  })
  overlay.addEventListener('click', () => toggleMenu());

  function toggleMenu() {
    menu.classList.toggle('burger-menu_active');
    if (menu.classList.contains('burger-menu_active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }
}

animateText();
imageCarousel();
linksNavigator();
burgerMenu('.burger-menu');