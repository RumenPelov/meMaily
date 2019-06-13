const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser')
const keys = require('./config/keys');
const countViews = require('./middlewares/countViews');
require('./models/User');
require('./models/Survey');
require('./models/Draft');
require('./models/Visit');
require('./services/passport');


mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
//mongoose.connect('mongodb://localhost:27017/my-emaily', { useNewUrlParser: true });

const app=express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

let count = new countViews();
app.use(count);

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    //express will serve up production assets like main.js main.css
    app.use(express.static('client/build'));

    //express will serve index.js if it doesnt recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);