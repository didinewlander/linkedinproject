const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
require('dotenv').config();

const class_connection = require('../Configs/classDB');
const sikumim_connection = require('../Configs/sikumDB');
const users_connection = require('../Configs/userDB');

const userRouter = require('../Routers/userRouter');
const classRouter = require('../Routers/classRouter');
const sikumRouter = require('../Routers/sikumRouter');

const userUri = process.env.USER_DB_CONNECTION;
const classUri = process.env.CLASS_DB_CONNECTION;
const sikumUri = process.env.SIKUM_DB_CONNECTION;
const youtubeAPI = process.env.YOUTUBE_KARNASH_API;
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/Static', express.static('Public'));
/*----------------Routes in the website--------------------*/

app.get('/', function (req, res) {
    res.sendFile('/index.html');
});

// app.get('/Dashboard', (req, res) => {

//     res.sendFile(path.join('./App', '/Dashboard.html'));
// }
// );

// app.use('/classes', () => {
//     classRouter;
//     class_connection(classUri);
// });
// app.use('/live', () => {
//     userRouter;
//     users_connection(userUri);
// });
// app.use('/sikumim', () => {
//     sikumRouter;
//     sikumim_connection(sikumUri);
// });

// app.use('/schedule', () => {
//     scheduleRouter;
// });

app.listen(port, () => console.log('listening on port ' + port));
