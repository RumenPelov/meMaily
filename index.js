

const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser')
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./models/Draft');
require('./services/passport');


mongoose.connect(keys.mongoURI);

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
//"webhook":"lt -p 5000 -s bladfgdfhdf"
//"webhook": "ssh -R 80:localhost:8080 -p 2222 ssh.localhost.run"
//"webhook":"forever sendgrid_webhook.js"
//"webhook": "ssh -R 80:localhost:5000 -p 2222 ssh.localhost.run"
//http://Rumenpelov.localhost.run/api/surveys/webhooks



app.listen(PORT);