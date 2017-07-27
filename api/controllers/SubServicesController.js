module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    getSubService: function (req, res) {
        if (req.body) {
            SubService.getSubService(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
};
module.exports = _.assign(module.exports, controller);