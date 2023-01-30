const jsonFile = require("jsonfile");
const filePath = './public/json/rabanimProfile.json';

const getRabanimImages = () => {
    return jsonFile.readFile(filePath);
}
module.exports = { getRabanimImages };