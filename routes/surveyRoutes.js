const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const path = require("path");
const mongoose =require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');
const Draft = mongoose.model('draft');


module.exports = app => {
    
    app.get('/api/surveys', requireLogin, async (req, res) => {
       const surveys = await Survey.find({ _user: req.user.id })
            .select({ recipients: false});

       res.send(surveys);
    });
  
    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        //res.send("Thanks for voting");
        res.sendFile(path.join(__dirname+'/views/index.html'));
    });

    app.post('/api/surveys/webhooks', (req, res) => {
 
        const p = new Path('/api/surveys/:surveyId/:choice');

        _.chain(req.body)
            .map( ({email, url}) => {

                const pathname = new URL(url).pathname;
                const match = p.test(pathname);
                if (match) {
                    return {email: email, surveyId: match.surveyId, choice: match.choice};
                }
            })
            //removes the undifined elements of the array
            .compact()
            //removes the elements which are the same
            .uniqBy('email', 'surveyId')
            .each(({surveyId, email, choice}) => {
                Survey.updateOne({
                    _id:surveyId,
                    recipients: {
                        $elemMatch: { email: email, responded: false}
                    }
                }, {
                    $inc: {[choice]: 1},
                    $set: { 'recipients.$.responded': true},
                    lastResponded: new Date()
                }).exec()
            })
            .value();

            res.send({});
        
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const {title, subject, body, recipients, from} = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({email:email.trim()})),
            _user: req.user.id,
            dateSent: Date.now()
        });

        //Great place to send email
        const mailer = new Mailer(survey, surveyTemplate(survey), from);
        
        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }


    });

    app.post('/api/surveys/delete', requireLogin, async (req, res) => {
        const {id} = req.body;

        await Survey.find()
            .deleteOne({ _id: id}, (err)=>{
                if (err){
                    res.status(422).send(err);
                }
           
            });

        const surveys = await Survey.find({ _user: req.user.id })
            .select({ recipients: false});

        res.send(surveys);

    });

    app.post('/api/surveys/draft', requireLogin, (req, res) => {
        const {title, subject, body, recipients, from} = req.body;

        const draft = new Draft({
            title,
            subject,
            body,
            recipients,
            from,
            _id: req.user.id
        });
        
        Draft.findOneAndUpdate({_id: req.user.id}, draft, {upsert:true, new:true}, (err, doc)=>{
            if(err){
                res.status(422).send({noDraft: true });

                console.log("Mongoose Error: ", err.message);
                return ;

            }
                res.send(doc);
                       
        }) ;
    });

    app.get('/api/surveys/draft', requireLogin,  function (req, res) {
             Draft.findById({_id: req.user.id}, {},  (err, doc) => {
            if (err) {
                res.send({noDraft: true });
                console.log("Mongoose Error: ", err.message);
                return ;
                
            }
            if (!doc){
                res.send({noDraft: true });
                return ;
            }
            res.send(doc);
        });        
     });

     app.post('/api/surveys/draft/delete', requireLogin, async (req, res) => {
      
        await Draft.find()
            .deleteOne({ _id: req.user.id}, (err)=>{
                if (err){
                    res.status(422).send({});
                    console.log("Mongoose Error: ", err.message);
                    return ;
                }
        });
        res.send({});
    });

}


/* app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('api/surveys/:surveyId/:choice');

    const events = _.map(req.body, ({email, url}) => {
        const pathname = new URL(url).pathname;
        const match = p.test(pathname);
        if (match) {
            return {email: email, surveyId: match.surveyId, choice: match.choice};
        }
    });
    //removes the undifined elements of the array
    const compactEvents = _.compact(events);
    //removes the elements which are the same
    const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');

    console.log(uniqueEvents);
    
}); */


