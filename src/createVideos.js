import fetchData from './fetchData';
import initSlider from './initSlider';

async function createVideos(e) {
  const searchItem = document.querySelector('.search');
  const slider = document.querySelector('.slider-container');
  const dots = document.querySelector('.dots');
  e.preventDefault();
  let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${searchItem.value}&type=video&key=AIzaSyAfSUrOZ6CQ8BJK323V-J1I9XIi0BIcfDs`; 
  if (slider) {
    slider.remove();
  }
  if (dots) {
    dots.remove();
  }
  let newUrl = await fetchData(url);
  initSlider(newUrl);
}

export default createVideos;
