module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    getAllName: function (req, res) {
        if (req.body) {
            SubServices.getAllName(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
    getOneName: function (req, res) {
        if (req.body) {
            SubServices.getOneName(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
};
module.exports = _.assign(module.exports, controller);