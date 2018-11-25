import createTag from './createTag';

function createSlider() {
  const slider = createTag('div', document.body, 'slider-container');
  const el = createTag('div', slider, 'slider-element');
  const ul = createTag('ul', slider, 'dots');
  const li = createTag('li', ul, 'dot');
  li.classList.add('active');
  li.textContent = '1';
  li.dataset.left = '0';
}

export default createSlider;