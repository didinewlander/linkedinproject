/*------ REQUIREMENTS ------*/

const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt') // for encrypting
const passport = require('passport') // for authenticating
const flash = require('express-flash') // for alerting in server
const session = require('express-session') // for session
const methodOverride = require('method-override') // for overriding post method from login
const initializePassport = require('./passport-config') // for passport configuration

/*------ SECRET SETUP ------*/

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const userUri = process.env.USER_DB_CONNECTION;
const classUri = process.env.CLASS_DB_CONNECTION;
const sikumUri = process.env.SIKUM_DB_CONNECTION;
const youtubeAPI = process.env.YOUTUBE_KARNASH_API;

/*------ AUTHENTICATION SETUP ------*/
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
}
/*------ DATABASE SETUP ------*/

const class_connection = require('./Configs/classDB');
const sikumim_connection = require('./Configs/sikumDB');
const users_connection = require('./Configs/userDB');


/*------ ROUTES SETUP ------*/

const userRouter = require('./Routers/userRouter');
const classRouter = require('./Routers/classRouter');
const sikumRouter = require('./Routers/sikumRouter');
const youtubeAPIRouter = require('./Routers/youtubeRouter');

/*------ EXPRESS APP SETUP ------*/

const app = express();

app.set('view-engine', 'ejs')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(flash());
app.use(session({
    secret: process.env.ACCESS_TOKEN_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use('/', express.static(path.join(__dirname, '/public')))

/*------ WEBSITE SETUP ------*/

app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name });
});


app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

app.post('login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true,
    failureMessage: "Username Don't exist"
}))
// app.use('/', require('./Routers/rootRouter'));
// app.use('/Dashboard', require('./Routers/dashboardRouter'));

// app.use('/json', youtubeAPIRouter);

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'public/views', '404.html'))
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

app.listen(3000);