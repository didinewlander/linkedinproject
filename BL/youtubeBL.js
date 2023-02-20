const youtubeWS = require('../DAL/youtubeDAL');
const rabanimImagesDAL = require('../DAL/imagesJsonDAL');
const backupMongoRequest = require('../DAL/videoStorage');

const addImageToQuery = async (valueSet) => {
  let links = await rabanimImagesDAL.getRabanimImages();
  let names = [], urls = [];
  for (let i = 0; i < links.length; i++) {
    names[i] = links[i].name;
    urls[i] = links[i].url;
  }
  if (valueSet[0].playlistID) { // for playlists
    let playlistSet = [];
    for (let i = 0; i < valueSet.length; i++) {
      const element = valueSet[i];
      let name = "כללי";
      let url = "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png";
      for (let j = 0; j < names.length; j++) {
        element.playlistTitle = element.playlistTitle.replace(`-`, ' ');
        if (element.playlistTitle.includes(names[j].trim())) {
          name = names[j];
          url = urls[j];
          break;
        }
      }
      const newOBJ = {
        playlistTitle: element.playlistTitle,
        playlistID: element.playlistID,
        playlistImageLink: element.playlistImageLink,
        playlistReleaseDate: element.playlistReleaseDate,
        speakerName: name,
        speakerImgUrl: url
      }
      playlistSet.push(newOBJ);
    }
    return playlistSet;
  }
  else {
    let videoSet = [];
    for (let i = 0; i < valueSet.length; i++) {
      const element = valueSet[i];
      let name = "כללי";
      let url = "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png";
      for (let j = 0; j < names.length; j++) {
        element.videoTitle = element.videoTitle.replace(`-`, ' ');
        if (element.videoTitle.includes(names[j].trim())) {
          name = names[j];
          url = urls[j];
          break;
        }
      }
      const newOBJ = {
        videoTitle: element.videoTitle,
        videoID: element.videoID,
        videoImageLink: element.videoImageLink,
        videoReleaseDate: element.videoReleaseDate,
        speakerName: name,
        speakerImgUrl: url
      }
      videoSet.push(newOBJ);
    }
    return videoSet;
  }
};

const getLatestTenVideos = async () => {
  let videosList = [];
  try {
    let { data } = await youtubeWS.getLatestTenVideos();
    console.log(`\x1b[37mData is received and sent to processing...\x1b[0m\n${data}`);
    videosList = data.items.map((video) => {
      console.log(video);
      return {
        videoID: video.id.videoId,
        videoTitle: video.snippet.title,
        videoImageLink: video.snippet.thumbnails.high.url,
        videoReleaseDate: video.snippet.publishedAt
      };
    });
    console.log(`\n\x1b[32mVideos completed successfully\x1b[0m`);
    videosList = await addImageToQuery(videosList);
    return videosList;
  }
  catch (err) {
    try {
      videosList = await backupMongoRequest.getAllVideos().then(console.log(`\x1b[32m\tUsed mongoDB video web server SUCCESSFULLY\x1b[0m`))
      let results = videosList.map((video) => {
        return {
          videoID: video.videoId,
          videoTitle: video.title,
          videoImageLink: video.thumbnail.high,
          videoReleaseDate: video.publishedAt
        };
      });
      return results.slice(0, 10);
    } catch (error) {
      const errMsg =
        [{
          errorAlert: "true",
          videoTitle: "Missing video title",
          videoID: "undefined",
          videoImageLink: "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000",
          videoReleaseDate: "Missing playlist release date",
          speakerImg: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
        }]
      console.log(`\x1b[31m\tFailed to use mongoDB video web server\x1b[0m`);

      return errMsg;
    }

  }

};

const getLatestPlaylists = async () => {
  let { data } = await youtubeWS.getLatestPlaylists();
  console.log("started working on playlists");
  try {
    let videosList = data.items.map((playlist) => {
      return {
        playlistID: playlist.id,
        playlistTitle: playlist.snippet.title,
        playlistImageLink: playlist.snippet.thumbnails.high.url,
        playlistReleaseDate: playlist.snippet.publishedAt
      };
    });
    videosList = await addImageToQuery(videosList);
    console.log("playlists completed successfully");
    return videosList;
  } catch (error) {
    const errMsg =
      [{
        errorAlert: "true",
        playlistTitle: "Missing playlist title",
        playlistID: "undefined",
        playlistImageLink: "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000",
        videoReleaseDate: "Missing playlist release date",
        speakerImg: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
      }]
    return errMsg;
  }

  /*const errMsg =
    [{
      errorAlert: "true",
      playlistTitle: "Missing playlist title",
      playlistID: "undefined",
      playlistImageLink: "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000",
      playlistReleaseDate: "Missing playlist release date",
      speakerImg: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
    }]
    return errMsg;*/
};

const getMostViewedVideos = async () => {
  let { data } = await youtubeWS.getMostViewedVideos();

  console.log("started working on videos");
  try {
    let videosList = data.items.map((video) => {
      return {
        videoID: video.id.videoId,
        videoTitle: video.snippet.title,
        videoImageLink: video.snippet.thumbnails.high.url,
        videoReleaseDate: video.snippet.publishedAt
      };
    });
    console.log("videos completed successfully");
    videosList = await addImageToQuery(videosList);
    return videosList;
  } catch (err) {
    const errMsg =
      [{
        errorAlert: "true",
        videoTitle: "Missing video title",
        videoID: "undefined",
        videoImageLink: "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000",
        videoReleaseDate: "Missing playlist release date",
        speakerImg: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
      }]
    return errMsg;
  }
};

module.exports = { getLatestTenVideos, getLatestPlaylists, getMostViewedVideos };//, getJsonVideos