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
    name:String,
    designation:String,
    image:String,
    summary:String,
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
module.exports = mongoose.model('Management', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
	getAggregatePipeLine: function (data) {

        var pipeline = [
          

        ];
        return pipeline;
    },


    getManagement:function(data,callback){
        async.waterfall([
                function (callback) {
                    var pipeLine = Management.getAggregatePipeLine(data);
                    Management.aggregate(pipeLine, function (err, complete) {
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
