const mongoose = require('mongoose');
const {Schema} = mongoose; //const Schema = mongoose.Schema;

const visitSchema = new Schema({
        _id: String
      }, 
      { capped: 10240 });

mongoose.model('visits', visitSchema);