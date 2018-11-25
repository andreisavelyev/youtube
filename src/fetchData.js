import Video from './video';
import createSlider from './createSlider';

async function fetchData(link) {
  const fetchedData = [];
  let url = link;
  let statisticsUrl = 'https://www.googleapis.com/youtube/v3/videos?part=statistics&key=AIzaSyAfSUrOZ6CQ8BJK323V-J1I9XIi0BIcfDs&id=';
  let nextPageToken = [];
  let data = await fetch(url)
    .then(response => response.json())
    .then((response) => {
      nextPageToken = response.nextPageToken;
      response.items.forEach((item) => {
        const {
          id: { videoId }, snippet: { publishedAt }, snippet: { title }, snippet: { description }, 
          snippet: { channelTitle }, snippet: { thumbnails: { medium: { url } } } } = item;
        const dataStorage = { videoId, publishedAt, title, description, channelTitle, url 
        };
        fetchedData.push(dataStorage);
      });
      let idList = fetchedData.map(item => item.videoId).join(',+');
      return fetch(statisticsUrl + idList);
})
    .then(response => response.json())
    .then((response) => {
      fetchedData.forEach(function getStatistics(item, index) { item['viewCount'] = response.items[index].statistics.viewCount})
    })
    .then(() => {
      if (!document.querySelector('.slider-container')) {
        createSlider(); 
      }
      fetchedData.forEach((item) => {
        const video = new Video(item);
        video.drawVideo();
      });
    })
    .then(() => {
      let token = url.indexOf('pageToken');
      if (token >= 0) {
        let template = url.slice(token);
        url = url.replace(template, `pageToken=${nextPageToken}`)
        return url;
      }
      url = `${url}&pageToken=${nextPageToken}`;
      return url;
    })
    .catch(err => alert(`error: ${err}. Please try again`));     
  return url;
}

export default fetchData;
