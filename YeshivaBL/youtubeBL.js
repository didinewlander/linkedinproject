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

const getLatestPlaylists = async () => {
  let { data } = await youtubeWS.getLatestPlaylists();
  console.log("started working on playlists");
  const videosList = data.items.map((playlist) => {
    return {
      playlistID: playlist.id,
      playlistTitle: playlist.snippet.title,
      playlistImageLink: playlist.snippet.thumbnails.high.url,
      playlistReleaseDate: playlist.snippet.publishedAt
    };
  });
  console.log("playlists completed successfully");
  return videosList;
};
module.exports = { getAllVideos, getLatestPlaylists };//, getJsonVideos