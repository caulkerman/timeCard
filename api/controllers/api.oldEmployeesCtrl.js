var oldEmployee = require("../models/api.oldEmployees.model");

module.exports = {


    create: function(req, res) {
        // console.log("the res.body: ", res.body);
        // console.log("the req.body: ", req.body);
        var oldEmployee = new OldEmployee(req.body);
        oldEmployee.save(function(err, result) {
          if (err) return res.status(500).send(err);
          else res.send(result);
      });
	},



};