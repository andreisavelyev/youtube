function createTag(tag, appendTo, className) {
  const element = document.createElement(tag);
  if (className) {
    element.classList.add(className);
  }
  appendTo.appendChild(element);
  return element;
}

export default createTag;
