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
subService: [{
        type: Schema.Types.ObjectId,
        ref: 'SubServices',
        index: true
    }],
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
name: String,
description:String,
image:String,
tagline: String,
priority:Number,
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Services', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));



    var model = {
        saveInServices: function (data, callback) {
                    Services.saveData(data, function (err, teamData) {
                        if (err) {
                            console.log("err", err);
                            callback("There was an error ", null);
                        } else {
                            if (_.isEmpty(teamData)) {
                                callback("No data found", null);
                            } else {
                                callback(null, teamData);
                            }
                        }
                    });
            
    },


 getAggregatePipeLine: function (data) {

        var pipeline = [
           // Stage 1
		{
			$lookup: {
			    "from" : "headers",
			    "localField" : "headerId",
			    "foreignField" : "_id",
			    "as" : "headerId"
			}
		},

		// Stage 2
		{
			$unwind: {
			    path : "$headerId",
			    
			}
		},

		// Stage 3
		{
			$lookup: {
			    "from" : "footers",
			    "localField" : "footerId",
			    "foreignField" : "_id",
			    "as" : "footerId"
			}
		},

		// Stage 4
		{
			$unwind: {
			    path : "$footerId",
			    
			}
		},

		// Stage 5
		{
			$lookup: {
			    "from" : "subservices",
			    "localField" : "subService",
			    "foreignField" : "_id",
			    "as" : "subService"
			}
		},


        ];
        return pipeline;
    },


    getService:function(data,callback){
        async.waterfall([
                function (callback) {
                    var pipeLine = Services.getAggregatePipeLine(data);
                    Services.aggregate(pipeLine, function (err, complete) {
                                        if (err) {
                                            console.log(err);
                                            callback(err, "error in mongoose");
                                        } else {
                                            if (_.isEmpty(complete)) {
                                                callback(null, []);
                                            } else {
                                                callback(null, complete);
                                            }
                                        }
                                    });
                }
            ],
            function (err, data2) {
                if (err) {
                    console.log(err);
                    callback(null, []);
                } else if (data2) {
                    if (_.isEmpty(data2)) {
                        callback(null, []);
                    } else {
                        callback(null, data2);
                    }
                }
            });
    }
    };
module.exports = _.assign(module.exports, exports, model);
