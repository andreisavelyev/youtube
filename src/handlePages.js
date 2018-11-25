function showPages(diff) {
  const dot = document.getElementsByClassName('dot');
  const dotHidden = document.getElementsByClassName('hidden');
  const marked = document.querySelector('.dot.active');
  if (dot.length - dotHidden.length <= 5) {
    if (diff < -50) {
      if (marked.classList.contains('hidden')) {
        marked.classList.remove('hidden');
        dot[+marked.textContent + 4].classList.add('hidden');
      }
    } else if (diff > 50) {
      if (marked.classList.contains('hidden')) {
        marked.classList.remove('hidden');
        dot[+marked.textContent - 6].classList.add('hidden');
      }
    }
    return;
  }
  if (diff < -50) {
    if (marked.textContent < dot.length) {
      for (let i = dot.length - 1; i >= 0; i -= 1) {
        if (!dot[i].classList.contains('hidden')) {
          dot[i].classList.add('hidden');
          break;
        }
      }
    }
    if (marked.classList.contains('hidden')) {
      marked.classList.remove('hidden');
      dot[+marked.textContent + 5].classList.add('hidden');
    }           
  } else if (diff > 50) {
    for (let i = 0; i < +marked.textContent - 5; i += 1) {
      dot[i].classList.add('hidden');
    }
  }
}

function hidePagesOnResize() {
  const dot = document.getElementsByClassName('dot');
  const marked = document.querySelector('.dot.active'); 
  for (let i = dot.length - 1; i >= 0; i -= 1) {
    dot[i].classList.add('hidden');
  }

  const point = +marked.textContent - 5;
  for (let j = +marked.textContent - 1; j >= point; j -= 1) {
    dot[j].classList.remove('hidden');
  }
}

export {
  hidePagesOnResize,
  showPages,
}