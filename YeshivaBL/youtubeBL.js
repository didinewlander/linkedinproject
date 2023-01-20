const youtubeWS = require('../DAL/youtubeDAL');

const getAllVideos = async () => {
  let { data } = await youtubeWS.getAllVideos();
  console.log("started working on items");
  const videosList = data.items.map((video) => {
    return {
      title: video.snippet.title,
      videoId: video.id.videoId,
      imageLink: video.snippet.thumbnails.high.url,
      date: video.snippet.publishTime,
    };
  });
  console.log("items completed successfully");
  return videosList;
};
module.exports = { getAllVideos };//, getJsonVideos