import createTag from './createTag';
import { hidePagesOnResize, showPages } from './handlePages';
import fetchData from './fetchData';

function initSlider(url) {
  const slider = document.querySelector('.slider-container');
  const el = document.querySelector('.slider-element');
  const videos = document.getElementsByClassName('video-container');
  const dots = document.querySelector('.dots');
  const dot = document.getElementsByTagName('dot');
  let newUrl = url;
  let counter = 1;
  let maxCounter = 4;
  let swipeCounter = 1;
  let width = videos[0].offsetWidth;
  let count = 4; 
  let devWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;

  if (devWidth <= 760) {
    count = 1;
    maxCounter = 13;
  } else if (devWidth <= 1160) {
    count = 2;
    maxCounter = 6;
  }

  let videoStyles = window.getComputedStyle(videos[0]);
  let videoMarginLeft = parseInt(videoStyles.getPropertyValue('margin-left'));

  let isDown = false;
  let startX;
  let endX;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    e.preventDefault();
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
  });

  slider.addEventListener('mouseup', async (e) => {
    isDown = false;
    endX = e.pageX - slider.offsetLeft;
    let diff = startX - endX;

    handleGesture(diff);

  });

  slider.addEventListener('mousemove', () => {
    if (!isDown) return;
  });

  dots.addEventListener('click', (e) => {
    if (e.target.tagName !== 'LI') {
      return;
    }
    el.style.marginLeft = `${e.target.dataset.left}px`;
    swipeCounter = +e.target.textContent;
    const marked = document.querySelector('.dot.active');
    marked.classList.remove('active');
    e.target.classList.add('active');
  });

  let touchstartX = 0;
  let touchendX = 0;
  let resizeTimer;

  window.addEventListener('resize', () => {
    let dot = document.getElementsByClassName('dot');
    let left = parseInt(el.style.marginLeft) ? parseInt(el.style.marginLeft) : 0;
    let createdVideos = document.getElementsByClassName('video-container');

    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      let resWidth = window.innerWidth;
      let vidAmount = document.getElementsByClassName('video-container').length;

      for (let i = 0; i < dot.length; i += 1) {
        if (dot[i].classList.contains('active')) {
          dot[i].classList.remove('active');
        }
      }

      if (resWidth < 2400 && resWidth > 1200) {
        count = 4;
        maxCounter = 4;

        if (left != 0) {
          let page = (-left / (width + videoMarginLeft) / count + 1);

          if (page < dot[dot.length - 1].textContent) {
            for (let i = +dot[dot.length - 1].textContent; i > page; i -= 1) {
              dots.removeChild(dot[i - 1]);
            }
          }
        }

        dot[dot.length - 1].classList.add('active');
        swipeCounter = +dot[dot.length - 1].textContent;
        hidePagesOnResize();
      } else if (resWidth < 1200 && resWidth > 800) {
        count = 2;
        maxCounter = 6;
        if (left != 0) {
          let page = (-left / (width + videoMarginLeft) / count + 1);
          for (let i = dot.length; i < page; i += 1) {
            let li = createTag('li', dots, 'dot');
            li.textContent = i + 1;
          }              

          if (page < dot[dot.length - 1].textContent) {
            for (let i =  +dot[dot.length - 1].textContent; i > page; i -= 1) {
              dots.removeChild(dot[i - 1]);
            }
          }
        }
        dot[dot.length - 1].classList.add('active');
        swipeCounter = +dot[dot.length - 1].textContent;       
        hidePagesOnResize();
      } else if (resWidth < 800 && resWidth > 300) {
        count = 1;
        maxCounter = 13;
        if (left != 0) {
          let page = (-left / (width + videoMarginLeft) + 1);
          for (let i = dot.length; i < page; i += 1) {
            let li = createTag('li', dots, 'dot');
            li.textContent = i + 1;
          }
        }

        dot[dot.length - 1].classList.add('active');
        swipeCounter = +dot[dot.length - 1].textContent;
        hidePagesOnResize();
      }

      for (let i = 0; i < dot.length; i += 1) {
        dot[i].dataset.left = `${-(width + videoMarginLeft) * count * i}`;
      }
    }, 250);

  });

  window.addEventListener('touchstart', (e) => {
    e.preventDefault();
    touchstartX = e.changedTouches[0].screenX;

  }, { passive: false });

  window.addEventListener('touchend', (e) => {
    e.preventDefault();
    touchendX = e.changedTouches[0].screenX;
    let diff = touchstartX - touchendX;
    handleGesture(diff);
}, false); 

  async function handleGesture(diff) {
    let style = window.getComputedStyle(el);
    let current = style.getPropertyValue('margin-left')     
    let value = parseInt(current);

    if (diff > 50) {
      counter += 1;
      value = Math.max(value - (width + videoMarginLeft) * count);
      el.style.marginLeft = `${value}px`;         
      const dot = document.getElementsByClassName('dot');
      swipeCounter += 1;
      if (swipeCounter == +dot[dot.length - 1].textContent + 1) {
        const li = createTag('li', dots, 'dot');
        li.dataset.left = value;
        li.textContent = swipeCounter;
      }

      const marked = document.querySelector('.dot.active');
      marked.classList.remove('active');
      marked.nextElementSibling.classList.add('active');

      showPages(diff);
    }
    if (diff < -50) {
      value = Math.min(value + (width + videoMarginLeft) * count, 0);
      el.style.marginLeft = `${value}px`;

      if (swipeCounter > 1) {
        swipeCounter -= 1;
      }
      const marked = document.querySelector('.dot.active');
      if (marked.previousElementSibling) {
        marked.classList.remove('active');
        marked.previousElementSibling.classList.add('active');
      }
      showPages(diff);
    }
    if (counter == maxCounter) {
      newUrl = await fetchData(newUrl);
      counter = 1;
    }
  }
}

export default initSlider;
