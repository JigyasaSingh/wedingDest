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
var schema = new Schema({
tagline:String,
teamId:String,
memberTeam: [{
        type: Schema.Types.ObjectId,
        ref: 'Member',
        index: true
    }],
    
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Team', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {

    };

module.exports = _.assign(module.exports, exports, model);
