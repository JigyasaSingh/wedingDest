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
    getAggregatePipeLine: function (data) {

        var pipeline = [
           // Stage 1
           {
			$match: {
			"_id":objectid(data._id)
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
		}
        ];
        return pipeline;
    },


    getMember:function(data,callback){
        var complete={};
        complete.coTeam=[];
        async.waterfall([
                function (callback) {
                    var pipeLine = Member.getAggregatePipeLine(data);
                    Member.aggregate(pipeLine, function (err, complete) {
                                        if (err) {
                                            console.log(err);
                                            callback(err, "error in mongoose");
                                        } else {
                                            if (_.isEmpty(complete)) {
                                                callback(null, []);
                                            } else {
                                                var finalData=complete[0];
                                                callback(null, finalData);
                                            }
                                        }
                                    });
                },
                function(finalData,callback){
                    var total=finalData;
                    total.temp=[];
                    async.eachSeries(finalData.teamId.memberTeam,function(n,innercallback){
                        async.waterfall([
                function (callback) {
                              if(!finalData._id.equals(n)){
                                  Member.findOne({_id:n}).exec(function (err, memberData) {
                                      if(err){
                                          callback(err,null);
                                      }else{
                                          callback(null,memberData);
                                      }
                                    }); 
                              }else{
                                  var memberData={};
                                  callback(null,memberData);
                              }},
                              function(memberData,callback){
                                  if(!_.isEmpty(memberData)){
                                    total.temp.push(memberData);
                                  }
                                    innercallback(null,total); 
                              }
                              ]
                              ,function (err, total) {
                                   if (err) {
                                    console.log(err);
                                    callback(null, []);
                                    } else if (total) {
                                      if (_.isEmpty(total)) {
                                         callback(null, []);
                                         } else {
                                         callback(null, total);
                                         }
                                       }
                                      });
                                                             
                                  },function (err) {
                                callback(null,total);
                            });
              
                }
            ],
            function (err, total) {
                if (err) {
                    console.log(err);
                    callback(null, []);
                } else if (total) {
                    if (_.isEmpty(total)) {
                        callback(null, []);
                    } else {
                        callback(null, total);
                    }
                }
            });
    },
    };

module.exports = _.assign(module.exports, exports, model);
