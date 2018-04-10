const mongoose = require('mongoose');
const {Schema} = mongoose; //const Schema = mongoose.Schema;
const RecipientSchema = require('./Recipient');

const DraftSchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients:String,
    from: String,
    _user: { type:Schema.Types.ObjectId, ref: 'User'},

})

mongoose.model('draft', DraftSchema);