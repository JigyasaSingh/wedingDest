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
teamId:{
        type: Schema.Types.ObjectId,
        ref: 'Team',
        index: true
    },
sliderImage:String,
mainServices:[{
        type: Schema.Types.ObjectId,
        ref: 'Services',
        index: true
    }],
aboutId:{
        type: Schema.Types.ObjectId,
        ref: 'About',
        index: true
    },
portfolioId:{
        type: Schema.Types.ObjectId,
        ref: 'Portfolio',
        index: true
    },
serviceId:{
        type: Schema.Types.ObjectId,
        ref: 'SubService',
        index: true
    },

memberTeam: [{
        type: Schema.Types.ObjectId,
        ref: 'Member',
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
module.exports = mongoose.model('Home', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    getAggregatePipeLine: function (data) {

        var pipeline = [
           // Stage 1
           {
			$match: {
			"active":true
			}
		},
		{
			$lookup: {
			    "from" : "teams",
			    "localField" : "teamId",
			    "foreignField" : "_id",
			    "as" : "teamId"
			}
		},

		// Stage 2
		{
			$unwind: {
			    path : "$teamId",
			    
			}
		},

		// Stage 3
		{
			$lookup: {
			    "from" : "members",
			    "localField" : "teamId.memberTeam",
			    "foreignField" : "_id",
			    "as" : "teamId.memberTeam"
			}
		},

		// Stage 4
		{
			$lookup: {
			    "from" : "headers",
			    "localField" : "headerId",
			    "foreignField" : "_id",
			    "as" : "headerId"
			}
		},

		// Stage 5
		{
			$unwind: {
			    path : "$headerId",
			}
		},

		// Stage 6
		{
			$lookup: {
			    "from" : "footers",
			    "localField" : "footerId",
			    "foreignField" : "_id",
			    "as" : "footerId"
			}
		},

		// Stage 7
		{
			$unwind: {
			    path : "$footerId",
			}
		},

        ];
        return pipeline;
    },


    getAciveAbout:function(data,callback){
        async.waterfall([
                function (callback) {
                    var pipeLine = About.getAggregatePipeLine(data);
                    About.aggregate(pipeLine, function (err, complete) {
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
    },


};


    

module.exports = _.assign(module.exports, exports, model);
