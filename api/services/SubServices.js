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
name: String,
headline:String,
description:String,
image:String,
icon: String,
mainService: {
        type: Schema.Types.ObjectId,
        ref: 'Services',
        index: true,
        key: 'subService'
    },
    
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
module.exports = mongoose.model('SubServices', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
getAllName:function(data,callback){
	SubServices.find().exec(function (err, complete) {
                                        if (err) {
                                            callback(err, null);
                                        } else if (_.isEmpty(complete)) {
                                            callback(null, []);
                                        } else {                                       
                                            callback(null, complete);
                                        }
                                    });
},

getOneName:function(data,callback){
	SubServices.findOne({_id:data._id}).exec(function (err, complete) {
                                        if (err) {
                                            callback(err, null);
                                        } else if (_.isEmpty(complete)) {
                                            callback(null, []);
                                        } else {                                       
                                            callback(null, complete);
                                        }
                                    });
}
 
  


};


module.exports = _.assign(module.exports, exports, model);
