const axios = require('axios');
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
	console.log("retrived latest videos api");
	const url = process.env.YOUTUBE_KARNASH_LATEST_TEN;
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

const getLatestFiftyVideos = () => {
	console.log(`\x1b[33m`,`|------ Fetching Youtube Data ------|\n\x1b[36m |------ Pulling latest 50 videos from youtube ------|`,`\x1b[0m`);
	const url = process.env.YOUTUBE_KARNASH_LATEST_FIFTY;
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
const getAllVideos = async () => {
	console.log("full update pull in progress");
	let nextPageToken =` %20`;
	let videos = [];
	let counter =0;
	try {
		while (nextPageToken !== null || nextPageToken !== undefined) {
			console.log(counter++);
			let url = `${process.env.YOUTUBE_KARNASH_LATEST}${nextPageToken}&key=${process.env.YOUTUBE_KARNASH_API}`;
			const response = await axios.get(url)
			.catch(err => {
				const errMsg =
					[{
						errorAlert: "true",
						videoTitle: "Missing video title",
						videoID: "undefined",
						videoImageLink: "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000",
						videoReleaseDate: "Missing playlist release date",
						speakerImg: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
					}]
				return err;
			})			
			nextPageToken = response.data.nextPageToken;
			const searchResults = response.data.items;
			videos.push(...searchResults);
		}
		return videos;

	} catch (error) {
		console.error('Some error occurred - might be a quota error, or some error with the API key. Please check your settings');
	}
};

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

module.exports = { getMostViewedVideos, getLatestTenVideos, getLatestPlaylists, getAllVideos, getLatestFiftyVideos };