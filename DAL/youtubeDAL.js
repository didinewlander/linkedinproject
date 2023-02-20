const axios = require('axios');
const backupMongoRequest = require('./videoStorage');
require('dotenv').config();

const getMostViewedVideos = () => {
	console.log("retrived most viewed videos api");
	const url = process.env.YOUTUBE_KARNASH_MOST_VIEWED;
	return axios.get(url).catch(err => {
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
	});
};


const getLatestTenVideos = () => {
	const url = process.env.YOUTUBE_KARNASH_LATEST_TEN;
	axios.get(url)
		.then((res) => {
			console.log(`\x1b[34m|------ Youtube Answered The Latest 10 Videos CALL ------|\x1b[0m`);
			return res;
		})
		.catch(async (err) => {
			try {
				console.log(`\x1b[31m\tYoutube was NOT available\x1b[0m`);
				console.log(`\x1b[33m\tCalling backup web server\x1b[0m`);
				await backupMongoRequest.getAllVideos().then((res) => { return res });
			} catch (error) {
				console.log(`\x1b[31mError With Server Database\x1b[0m`);
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
		});
};

const getLatestFiftyVideos = () => {
	console.log(`\x1b[33m`, `|------ Fetching Youtube Data ------|\n\x1b[36m |------ Pulling latest 50 videos from youtube ------|`, `\x1b[0m`);
	const url = process.env.YOUTUBE_KARNASH_LATEST_FIFTY;
	return axios.get(url).catch(err => {
		const errMsg =
		{
			errorAlert: "true",
			videoTitle: "Missing video title",
			videoID: "undefined",
			videoImageLink: "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000",
			videoReleaseDate: "Missing playlist release date",
			speakerImg: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
		}
		return errMsg;
	});
};

const getFromMongoAsBackup = async () => {
	console.error(`\x1b[31m😳 You Exceeded Your Quota Limit Of Today.\n Moving To Server Database For Temporary Data\x1b[0m\n`);
	try {
		const data = await backupMongoRequest.getAllVideos();
		return data;
	} catch (error) {
		console.log(`\x1b[31mError With Server Database\x1b[0m\n`);
	}
}

const getFromAxios = async (url) => {
	axios.get(url)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			return [
				{
					errorAlert: "true",
					videoTitle: "Missing video title",
					videoID: "undefined",
					videoImageLink:
						"https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000",
					videoReleaseDate: "Missing playlist release date",
					speakerImg:
						"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
				}
			];
		});
}
const loopThroughYoutube = async (nextPageToken, apiCommand, apiKey) => {
	let videos = [];
	while (nextPageToken !== null && nextPageToken !== undefined) {
		const url = `${apiCommand}${nextPageToken}&type=video&key=${apiKey}`;
		const response = await getFromAxios(url);
		try {
			nextPageToken = response.data.nextPageToken ? response.data.nextPageToken : () => { throw "endOfList" };
			videos.push(response.data.items);
		}
		catch (stringError) {
			if (stringError instanceof TypeError) {
				console.log(`\x1b[31mError With Response From Server - Data Is Undefined. Probably Because API Limitations\x1b[0m`);
				throw (stringError);
			}
			else {
				console.log(`\x1b[31mReached End Of Video List From Youtube - Finishing Import\x1b[0m`);
				videos.push(response.data.items);
			}
		}
	}
	return videos;
}
const getAllVideos = async () => {
	try {
		console.log(`\x1b[36m|------ Started Pulling All Videos From Youtube ------|\x1b[0m`);
		return await loopThroughYoutube("", process.env.YOUTUBE_KARNASH_LATEST, process.env.YOUTUBE_KARNASH_API);;
	}
	catch (error) {
		return getFromMongoAsBackup();
	}
}


const getLatestPlaylists = () => {
	console.log("retrived latest playlist api");
	const url = process.env.YOUTUBE_KARNASH_LATEST_PLAYLIST;
	return axios.get(url).catch(err => {
		const errMsg =
			[{
				errorAlert: "true",
				playlistTitle: "Missing playlist title",
				playlistID: "undefined",
				playlistImageLink: "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000",
				playlistReleaseDate: "Missing playlist release date",
				speakerImg: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
			}]
		return errMsg;
	});
};

module.exports = { getMostViewedVideos, getLatestTenVideos, getLatestPlaylists, getAllVideos, getLatestFiftyVideos, getFromMongoAsBackup };