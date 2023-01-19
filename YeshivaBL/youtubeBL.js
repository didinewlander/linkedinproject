const youtubeWS = require('../DAL/youtubeDAL');

const getAllVideos = async () => {
  console.log("started working on items");
  let { data: Items } = await youtubeWS.getAllVideos();

  Items = Items.map((video) => {
    return {
      title: video.snippet.title,
      videoId: video.id.videoId,
      imageLink: video.snippet.thumbnails.high.url,
      date: video.snippet.publishTime,
    };
  });
  console.log("all items prepared");
  return Items;
};

const getJsonVideos = async () => {
  const { items } = await youtubeWS.getJsonVideos();
  return items;
};
module.exports = { getAllVideos, getJsonVideos };