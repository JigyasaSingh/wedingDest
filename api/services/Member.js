var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var uniqueValidator = require('mongoose-unique-validator');
var timestamps = require('mongoose-timestamp');
var validators = require('mongoose-validators');
var monguurl = require('monguurl');
// var autoIncrement = require('mongoose-auto-increment');
var objectid = require("mongodb").ObjectID;
var moment = require('moment');
var request = require("request");
// var generator = require('generate-password');
// autoIncrement.initialize(mongoose);
var schema = new Schema({
  teamId: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        index: true,
        key: 'memberTeam'
    },
    headerId:{
        type: Schema.Types.ObjectId,
        ref: 'Header',
        index: true
    },
    footerId:{
        type: Schema.Types.ObjectId,
        ref: 'Footer',
        index: true
    },
    name:String,
    designation:String,
    image:String,
    summary:String,
    fbProfile:String,
    twitterProfile:String,
    pinterest:String,
    skype:String,
    youTube:String,
    isHomeView:Boolean
    
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
// schema.plugin(autoIncrement.plugin, {
//     model: 'Athelete',
//     field: 'atheleteID',
//     startAt: 1,
//     incrementBy: 1
// });
schema.plugin(timestamps);
module.exports = mongoose.model('Member', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {

    };

module.exports = _.assign(module.exports, exports, model);
