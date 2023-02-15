const videoStorage = require('../DAL/videoStorage');
const youtubeWS = require('../DAL/youtubeDAL');
const rabanimImagesDAL = require('../DAL/imagesJsonDAL');

const fullVideoListPullData = async () => {
    let { data } = youtubeWS.getAllVideos();
    try {
        let fullVideoList = await data.items.map((item) => {
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

        });
        /* After getting all the data,
 I want to clean it here.
 because this is a full update of the data -
 it should be cleaned before insertion */
        const finalVideoDataToPush = cleanDataBeforeSubmition(fullVideoList);
        try {
            for (obj in finalVideoDataToPush) {
                await videoStorage.createVideo(obj);
            }
        } catch (error) {
            return `error creating video ${obj.videoId}`;
        }
    }
    catch (error) {
        return "error with getting the videos from youtube";
    }
}

const cleanDataBeforeSubmition = async (videoList) => {
    let speakersList = await rabanimImagesDAL.getRabanimImages();
    let speakerNames = speakersList.map(speaker => speaker.name);
    let speakerProfileImages = speakersList.map(speaker => speaker.url);

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
        element.speaker.push(name)
        element.speakerImage = url;
        return element;
    });
    return dataCopy;
};

module.exports = {fullVideoListPullData}