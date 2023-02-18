const videoInput = require('../Models/videoModelInput');

/*--------- Read Functions ----------*/
const getAllVideos = async () => {
    try {
        return await videoInput.find({});
    } catch (error) {
        console.log('Error fetching all videos');
    }
};

const getVideoById = async (_id) => {
    try {
        return await videoInput.find({ videoId: _id });
    } catch (error) {
        console.log('Error fetching video by ID');
    }
};

const getVideoBeforeOrAtDate = async (_date) => {
    try {
        return await videoInput.find({ publishedAt: { $lte: _date } });
    } catch (error) {
        console.log('Error fetching videos before or at given date');
    }
};

const getVideoAfterDate = async (_date) => {
    try {
        return await videoInput.find({ publishedAt: { $gt: _date } });
    } catch (error) {
        console.log('Error fetching videos after given date');
    }
};

const getVideoBySpeaker = async (_speaker) => {
    try {
        return await videoInput.find({ speaker: { $in: [_speaker] } });
    } catch (error) {
        console.log('Error fetching videos by speaker');
    }
};

const getVideoByTags = async (_tags) => {
    try {
        return await videoInput.find({ tags: { $in: [_tags] } });
    } catch (error) {
        console.log('Error fetching videos by tags');
    }
};

const getVideoByPlaylistId = async (_playlistId) => {
    try {
        return await videoInput.find({ playlistId: _playlistId });
    } catch (error) {
        console.log('Error fetching videos by playlist ID');
    }
};

/*--------- Create Function ----------*/

const createVideo = async (video) => {
    try {
        await video.save()
            .then((result) => console.log(`\x1b[32mNew video added to database! \x1b[37mVideo ID is: \x1b[36m${video.videoId} \x1b[32-- the video was saved at ${new Date().toString()}\x1b[0m`))
            .catch((err) => {
                if (err[0] == 'MongoServerError' || err.code === 11000) {
                    console.log(`\x1b[33mDuplicate video id found! \x1b[37mVideo ID is: \x1b[36m${video.videoId} \x1b[31m-- the video was not added to the database.\x1b[0m`);
                }
                else {
                    console.log('Error saving video to DB', err);
                }
            })

    } catch (error) {
        return `${error} or Error with video creation`;
    }
}

/*--------- Update Function ----------*/

const updateVideoById = async (_id, obj) => {
    try {
        let videoToUpdate = await getVideoById(_id);
        await videoInput.findByIdAndUpdate(videoToUpdate.id, obj);
        return `${obj.title} was updated successfully`;
    } catch (error) {
        return `Error updating video ${videoToUpdate.title}`;
    }
}

/*--------- Delete Function ----------*/

const deleteVideoById = async (_id, obj) => {
    try {
        let findVideoToDelete = await getVideoById(_id);
        await videoInput.findByIdAndDelete(findVideoToDelete.id);
        return `${findVideoToDelete.title} was deleted successfully`;
    } catch (error) {
        return `Error with deleting ${findVideoToDelete.title}`;
    }
}

module.exports = {
    getAllVideos,
    getVideoById,
    getVideoBeforeOrAtDate,
    getVideoAfterDate,
    getVideoBySpeaker,
    getVideoByTags,
    getVideoByPlaylistId,
    createVideo,
    updateVideoById,
    deleteVideoById
}