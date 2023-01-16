const youtubeWS = require('../DAL/youtubeDAL');

const getAllVideos = async () => {
  let { data: Items } = await youtubeWS.getAllVideos();

  Items = Items.map((video) => {
    return {
      title: video.snippet.title,
      videoId: video.id.videoId,
      imageLink: video.snippet.thumbnails.high.url,
      date: video.snippet.publishTime,
    };
  });

  return Items;
};

module.exports = { getAllVideos };