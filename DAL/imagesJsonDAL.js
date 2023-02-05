const jsonFile = require("jsonfile");
const filePath = './public/json/rabanimProfile.json';

const getRabanimImages = async () => {
    const jsonData = await jsonFile.readFile(filePath);
    return jsonData;
}

module.exports = { getRabanimImages };