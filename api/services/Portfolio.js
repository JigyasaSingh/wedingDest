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
tagline:String,
image: [{type:String}], 
homeImage:String,    
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
schema.plugin(timestamps);
module.exports = mongoose.model('Portfolio', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    search: function (data, callback) {
        var Model = this;
        var Const = this(data);
        var maxRow = Config.maxRow;

        var page = 1;
        if (data.page) {
            page = data.page;
        }
        var field = data.field;
        var options = {
            field: data.field,
            filters: {
                keyword: {
                    fields: ['tagline'],
                    term: data.keyword
                }
            },
            sort: {
                desc: 'createdAt'
            },
            start: (page - 1) * maxRow,
            count: maxRow
        };
        
            var deepSearch = " ";
            var Search = Model.find(data.keyword)

                .order(options)
                // .deepPopulate(deepSearch)
                .keyword(options)
                .page(options, callback);
    },

    savePorfolio: function(data,callback){
        async.waterfall([
            function(callback){
                var found={};
                found.firstname="Jigyasa";
                // var found1="Singh";
                found.surname="Singh";
                callback(null,found);
            },
            function(found,callback){
                console.log("found",found);
                callback(null,found);
                // console.log("found1",found1);
            }
        ],function(err,complete){
            if(err){
                callback(err,null);
            }else{
                if(_.isEmpty(complete)){
                    callback(null,[]);
                }else{
                    callback(null,complete);
                }
            }
        });

    },
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
