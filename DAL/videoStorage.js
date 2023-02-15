const videoInput = require('../Models/videoModelInput');

/*--------- Read Functions ----------*/
const getAllVideos = async () => {
    try {
        return await videoInput.find({});
    } catch (error) {
        throw new Error('Error fetching all videos');
    }
};

const getVideoById = async (_id) => {
    try {
        return await videoInput.find({ videoId: _id });
    } catch (error) {
        throw new Error('Error fetching video by ID');
    }
};

const getVideoBeforeOrAtDate = async (_date) => {
    try {
        return await videoInput.find({ publishedAt: { $lte: _date } });
    } catch (error) {
        throw new Error('Error fetching videos before or at given date');
    }
};

const getVideoAfterDate = async (_date) => {
    try {
        return await videoInput.find({ publishedAt: { $gt: _date } });
    } catch (error) {
        throw new Error('Error fetching videos after given date');
    }
};

const getVideoBySpeaker = async (_speaker) => {
    try {
        return await videoInput.find({ speaker: { $in: [_speaker] } });
    } catch (error) {
        throw new Error('Error fetching videos by speaker');
    }
};

const getVideoByTags = async (_tags) => {
    try {
        return await videoInput.find({ tags: { $in: [_tags] } });
    } catch (error) {
        throw new Error('Error fetching videos by tags');
    }
};

const getVideoByPlaylistId = async (_playlistId) => {
    try {
        return await videoInput.find({ playlistId: _playlistId });
    } catch (error) {
        throw new Error('Error fetching videos by playlist ID');
    }
};

/*--------- Create Function ----------*/

const createVideo = async (obj) => {
    const newVideo = new videoInput(obj);

    try {
        const checkIfExist = await getVideoById(obj.videoId);
        if (checkIfExist.videoId === obj.videoId) {
            throw new Error("Video already exists");
        }
        else {
            await newVideo.save();
            return `${newVideo.videoId} Video saved to DB at ${new Date().toString()}`;
        }
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