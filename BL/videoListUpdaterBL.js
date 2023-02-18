const videoStorage = require('../DAL/videoStorage');
const youtubeWS = require('../DAL/youtubeDAL');
const rabanimImagesDAL = require('../DAL/imagesJsonDAL');
const videoInput = require('../Models/videoModelInput');

const fullVideoListPullData = async () => {
    let { data } = youtubeWS.getAllVideos();
    let counter = 0;
    console.log("Starting pulling videos from youtube");
    try {
        let fullVideoList = await data.items.map((item) => {
            if (item.id.videoId) {
                console.log(counter++);
                return {
                    "videoId": item.id.videoId,
                    "kind": item.id.kind,
                    "publishedAt": item.snippet.publishedAt,
                    "title": item.snippet.title,
                    "description": item.snippet.description,
                    "thumbnail": {
                        "default": item.snippet.thumbnails.default.url,
                        "high": item.snippet.thumbnails.high.url
                    },
                    "speaker": [],
                    "playlistId": [],
                    "tags": [],
                    "speakerImage": ""
                }
            }
        });
        /* After getting all the data,
 I want to clean it here.
 because this is a full update of the data -
 it should be cleaned before insertion */
        const finalVideoDataToPush = cleanDataBeforeSubmition(fullVideoList);
        pushDataToVideoStorage(finalVideoDataToPush);
    }
    catch (error) {
        return "error with getting the videos from youtube";
    }
}

const timedUpdate = async (latestVideoId) => {
    try {
        console.log(`\x1b[1m`,`TimedUpdate called`,`\x1b[0m`);
        let { data } = await youtubeWS.getLatestFiftyVideos();
        let videoList = data.items.map((item) => {
            try {
                return {
                    "videoId": item.id.videoId,
                    "kind": item.id.kind,
                    "publishedAt": item.snippet.publishedAt,
                    "title": item.snippet.title,
                    "description": item.snippet.description,
                    "thumbnail": {
                        "default": item.snippet.thumbnails.default.url,
                        "high": item.snippet.thumbnails.high.url
                    },
                    "speaker": [],
                    "playlistId": [],
                    "tags": [],
                    "speakerImage": ""
                }
            }
            catch (err) {
                console.log(err);
            }
        });
        pushDataToVideoStorage(videoList);
    } catch (error) {
        return "error with getting the videos from youtube";

    }

}

const cleanDataBeforeSubmition = async (videoList) => {
    console.log("================================");
    let speakersList = await rabanimImagesDAL.getRabanimImages();
    let speakerNames = speakersList.map(speaker => speaker.name);
    let speakerProfileImages = speakersList.map(speaker => speaker.url);
    return addNameAndUrlToSpeaker(videoList, speakerNames, speakerProfileImages);
};

const pushDataToVideoStorage = async (finalVideoDataToPush) => {
    console.log(`\x1b[37m================================\x1b[0m`);
    try {
        await Promise.all(finalVideoDataToPush.map(async (obj) => {
            const newVideo = new videoInput(obj);
            return videoStorage.createVideo(newVideo);
        }));
        console.log(`\n\x1b[33mVideos updated successfully at\x1b[37m ${new Date().toString()}\x1b[0m`);
    } catch (err) {
        console.log(`\x1b[31merror creating video ${obj.videoId}\x1b[0m`);
    }
}
const addNameAndUrlToSpeaker = (videoList, speakerNames, speakerProfileImages) => {
    console.log("Finishing up this video")
    const dataCopy = videoList.map(element => {
        let name = "כללי";
        let url = "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png";
        for (let j = 0; j < speakerNames.length; j++) {
            // this loop replaces - with space, to avoid errors when assigning search results.
            element.videoTitle = element.videoTitle.replace(`-`, ' ');
            if (element.videoTitle.includes(speakerNames[j].trim())) {
                name = speakerNames[j];
                url = speakerProfileImages[j];
                break;
            }
        }
        element.speaker.push(name);
        element.speakerImage = url;
        return element;
    });
    return dataCopy;
}


module.exports = { timedUpdate, fullVideoListPullData }