module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    saveInTeam: function (req, res) {
        if (req.body) {
            Team.saveInTeam(req.body, res.callback);
        }else{
            res.json({
                value: false,
                data: "User Not logged in"
            });
        }
    },

    search: function (req, res) {
        if (req.body) {
            Team.search(req.body, res.callback);
        }else{
            res.json({
                value: false,
                data: "User Not logged in"
            });
        }
    },
    getTeam: function (req, res) {
        if (req.body) {
            Team.getTeam(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
};
module.exports = _.assign(module.exports, controller);