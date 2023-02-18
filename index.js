/*------ REQUIREMENTS ------*/
const scheduler = require('node-schedule');
const express = require('express');
const cors = require('cors');
const path = require('path');

/*------ SECRET SETUP ------*/


require('dotenv').config();

// scheduler.scheduleJob('30 2 * * 0', () => {
//     console.log('Called weekly full update');
//     require('./BL/videoListUpdaterBL').fullVideoListPullData();
// });



const userUri = process.env.USER_DB_CONNECTION;
const videoUri = process.env.VIDEO_DB_CONNECTION ;
const classUri = process.env.CLASS_DB_CONNECTION;
const sikumUri = process.env.SIKUM_DB_CONNECTION;
const youtubeAPI = process.env.YOUTUBE_KARNASH_API;
const port = process.env.PORT;

/*------ AUTHENTICATION SETUP ------> reuse when relavent

const bcrypt = require('bcrypt') // for encrypting
// const passport = require('passport') // for authenticating
// const flash = require('express-flash') // for alerting in server
// const session = require('express-session') // for session
// const methodOverride = require('method-override') // for overriding post method from login
// const initializePassport = require('./Configs/passport-config') // for passport configuration

initializePassport(passport,
    email => { return users.find(user => user.email === email) },
    id => { return users.find(user => user.id === id) });

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}*/
/*------ DATABASE SETUP ------*/
const mongoose = require('mongoose');
const video_connection = require('./Configs/videosDB');


/*------ ROUTES SETUP ------*/

const userRouter = require('./Routers/userRouter');
const classRouter = require('./Routers/classRouter');
const sikumRouter = require('./Routers/sikumRouter');
const youtubeAPIRouter = require('./Routers/youtubeRouter');
const jsonUpdate = require('./BL/jsonBL')

/*------ EXPRESS APP SETUP ------*/

const app = express();
let userInfo = {
    statisticData: {
        enters: 0,
        videos: 0
    }
}

let userManage = {

}
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public/views'));
app.set('json', path.join(__dirname, 'public/json'));
app.set('view-engine', 'ejs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

/*------ WEBSITE SETUP ------*/
video_connection(videoUri); // connect to video server DB


// scheduler.scheduleJob('/1 * * * *', () => {
//     console.log('Called weekly full update');
//     require('./BL/videoListUpdaterBL').timedUpdate();
// })

// Home page
app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/collection', (req, res) => {
    res.render('collection.ejs');
})
app.get('/live', (req, res) => {
    res.render('live.ejs');
})
app.get('/calender', (req, res) => {
    res.render('calender.ejs');
})
app.get('/search', (req, res) => {
    res.render('search.ejs');
})
app.get('/dashboard', (req, res) => {
    res.render('dashboard.ejs', userInfo);
    userInfo.statisticData.enters += 1;
})
app.get('/update', jsonUpdate.update);

app.use('/youtube', require('./Routers/youtubeRouter'));
app.use('/mostviewed', require('./Routers/mostviewedRouter'));
app.use('/playlists', require('./Routers/playlistRouter'));
app.use('/jsontest', require('./Routers/jsontestRouter'));
app.use((req, res) => {
    res.status(404).render('404.ejs');
})

app.listen(port, console.log(`\x1b[32mConnecting and listening to port ${port}\x1b[0m\n- - * * * - -`));
