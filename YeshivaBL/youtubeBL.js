const youtubeWS = require('../DAL/youtubeDAL');
const rabanimImagesDAL = require('../DAL/imagesJson');
const errorReturn = {
  playlistTitle: "Missing playlist title",
  playlistID: "undefined",
  playlistImageLink: "#",
  playlistReleaseDate: "Missing playlist release date",
  speakerImg: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
};
const addImageToQuery = async (valueSet) => {
  let links = await rabanimImagesDAL.getRabanimImages();
  console.log("accessing links");
  let tempSet = []
  for (const value of valueSet) {
    if (value.type === 'video') // this is a video and not a playlist
    {
      let nameset = value.title.split("|");
      let speakerImgUrl = links.find(link => link.name == nameset[1]);
      const newOBJ = {
        title: value.title,
        videoId: value.videoId,
        imageLink: value.imageLink,
        date: value.date,
        speakerImg: speakerImgUrl
      }
      tempSet.push(newOBJ);
    }
    else {
      let nameset = value.playlistTitle.split("|");
      let speakerImgUrl = links.find(link => link.name == nameset[1]);
      const newOBJ = {
        playlistTitle: value.playlistTitle,
        playlistID: value.playlistID,
        playlistImageLink: value.playlistImageLink,
        playlistReleaseDate: value.playlistReleaseDate,
        speakerImg: speakerImgUrl
      }
      tempSet.push(newOBJ);
    }
  }
  return tempSet;
};
const getAllVideos = async () => {
  let { data } = await youtubeWS.getAllVideos();
  console.log(data.json());
  try {
    const videosList = data.items.map((video) => {
      return {
        type: "video",
        title: video.snippet.title,
        videoId: video.id.videoId,
        imageLink: video.snippet.thumbnails.high.url,
        date: video.snippet.publishTime,
      };
    });
    console.log("Completed videos setup - level 1");
    return videosList;
  }
  catch {
    console.log("error retrieving videos from youtube");
    return errorReturn;
  }

};

const getLatestPlaylists = async () => {
  let { data } = await youtubeWS.getLatestPlaylists()
  console.log(data.json());
  try {
    const videosList = data.items.map((playlist) => {
      return {
        type: "playlist",
        playlistID: playlist.id,
        playlistTitle: playlist.snippet.title,
        playlistImageLink: playlist.snippet.thumbnails.high.url,
        playlistReleaseDate: playlist.snippet.publishedAt
      };
    });

    console.log("Completed playlists setup - level 1");
    videosList = addImageToQuery(videosList);
    return videosList;
  }
  catch {
    console.log("error retrieving playlists from youtube");
    return errorReturn;
  }

};
module.exports = { getAllVideos, getLatestPlaylists };//, getJsonVideos