import createTag from './createTag';
import createVideos from './createVideos';

function init() {
  const form = createTag('form', document.body, 'search-form');
  const searchBox = createTag('input', form, 'search');
  searchBox.setAttribute('type', 'search');
  const submitBtn = createTag('input', form, 'submit');
  submitBtn.setAttribute('type', 'submit');
  submitBtn.addEventListener('click', createVideos);
  submitBtn.setAttribute('value', 'Submit');
}

export default init;
