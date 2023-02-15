const express = require('express');
const fs = require('fs');
const app = express();

const update = async (req, res) => {
    try {
        let newObjects = [];
        // Read existing JSON file
        const existingData = JSON.parse(fs.readFileSync('./public/json/localVideoStorage.json', 'utf8'));
        // Read new JSON file
        const newData = JSON.parse(fs.readFileSync('./public/json/data.json', 'utf8'));

        newObjects = newData.items.map((item, i) => {
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
                "tags": []
            }
        })
        console.log(newObjects);
        // Create a set of videoIds from existing data
        const existingVideoIds = new Set(existingData[1].items.map(item => item.videoId));

        // Extract new objects from new data that don't already exist in existing data
        newObjects = newObjects.filter(newObj => {
            return !existingVideoIds.has(newObj.videoId);
        });
        console.log(newObjects);

        // Add a serial number to each new object
        newObjects.forEach((newObj, i) => {
            newObj.serialNumber = i + existingData[1].items.length;
        });
        console.log(newObjects);

        // Append new objects to existing data
        existingData[1].items.push(...newObjects);

        // Update last update time
        existingData[0].lastUpdate = new Date().toString();
        console.log(newObjects);

        // Write updated JSON data back to file
        fs.writeFileSync('./public/json/localVideoStorage.json', JSON.stringify(existingData));

        res.status(200).send(`${newObjects.length} new objects added to local JSON file!`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error appending to local JSON file');
    }
};

module.exports = { update }