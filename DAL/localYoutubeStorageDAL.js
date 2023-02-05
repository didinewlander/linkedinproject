const { request } = require("express");
const jsonFile = require("jsonfile");
const nodeCache = require("node-cache");

const filePath = './public/json/localYoutubeStorage.json';
const cache = new nodeCache();

const cacheYoutubeVideos = (req, res, next) => {
    if (req.method !== 'GET') {
        console.error('Cannot get non GET methods');
        return next();
    }

    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse){
        console.log('cache found key: ' + key);
        res.send(cachedResponse);
    }
    console.log('no key found for key: ' + key);
    res.originalSend = res.send;
    res.send= body=>{
        request.originalSend(body);
        cache.set(key, body, duration);
    }
}

const getRabanimImages = async () => {
    const jsonData = await jsonFile.readFile(filePath);
    return jsonData;
}

module.exports = { getRabanimImages };