import createTag from './createTag';

class Video {
  constructor(props) {
    Object.assign(this, props);
  }

  drawVideo() {
    const slider = document.querySelector('.slider-element');
    const videoContainer = createTag('div', slider, 'video-container');
    const image = createTag('img', videoContainer, 'video-image');
    image.setAttribute('alt', 'video preview');
    image.setAttribute('src', `${this.url}`);
    const link = createTag('a', videoContainer, 'video-link');
    link.textContent = `${this.title}`;
    link.setAttribute('href', `https://youtu.be/${this.videoId}`);
    const ul = createTag('ul', videoContainer);
    const lis = [];
    for (let i = 0; i < 3; i += 1) {
      const li = createTag('li', ul, 'video-statistics');
      const icon = createTag('i', li);
      const span = createTag('span', li);
      lis.push(li);
    }
    lis[0].textContent = `${this.channelTitle}`;
    lis[1].textContent = `${this.publishedAt.slice(0, 10)}`;
    lis[2].textContent = `${this.viewCount}`;
    const paragraph = createTag('p', videoContainer, 'video-description');
    paragraph.textContent = (this.description.length > 0) ? `${this.description}` : 'The video has no description';
  }
}

export default Video;