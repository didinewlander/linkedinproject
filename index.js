const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const class_connection = require('./Configs/classDB');
const sikumim_connection = require('./Configs/sikumDB');
const users_connection = require('./Configs/userDB');

const userRouter = require('./Routers/userRouter');
const classRouter = require('./Routers/classRouter');
const sikumRouter = require('./Routers/sikumRouter');

const userUri = process.env.USER_DB_CONNECTION;
const classUri = process.env.CLASS_DB_CONNECTION;
const sikumUri = process.env.SIKUM_DB_CONNECTION;
const youtubeAPI = process.env.YOUTUBE_KARNASH_API;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*----------------Routes in the website--------------------*/

app.get('/', function (req, res) {
    try {
        res.sendFile('index.html', { root: './App' })
    } catch (error) {
        res.json(error);
    }
});

app.get('/dashboard', function (req, res) {
    try {
        res.sendFile('Dashboard.html', { root: './App' })
    } catch (error) {
        res.json(error);
    }
});

app.use('/classes', () => {
    classRouter;
    class_connection(classUri);
});
app.use('/live', () => {
    userRouter;
    users_connection(userUri);
});
app.use('/sikumim', () => {
    sikumRouter;
    sikumim_connection(sikumUri);
});

app.use('/schedule', () => {
    scheduleRouter;
});