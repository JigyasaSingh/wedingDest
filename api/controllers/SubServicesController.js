module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    saveAbout: function (req, res) {
        if (req.body) {
            About.saveAbout(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
};
module.exports = _.assign(module.exports, controller);