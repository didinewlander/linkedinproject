const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
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
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '/Static')))
/*----------------Routes in the website--------------------*/

app.use('/', require('./Routers/rootRouter'));
//app.use('/Dashboard', require('./Routers/dashboardRouter'));

//app.use('/json', require('./Routers/youtubeRouter'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'Static/html', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})
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