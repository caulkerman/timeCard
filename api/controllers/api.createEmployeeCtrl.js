var NewEmployee = require("../models/api.createEmployee.model");


module.exports = {
	
	create: function(req, res) {
		console.log("req in api controller create", req.body);
		console.log("res in api controller create", res.body);

        var newEmployee = new NewEmployee(req.body);
        newEmployee.save(function(err, result) {
            if (err) return res.status(500).send(err);
            else res.send(result);

        });
	},


	read: function(req, res) {
    console.log("req in api controller read ", req.body);
    console.log("res in api controller read ", res.body);
    NewEmployee.find(req.query)
    .exec(function(err, result) {
      if (err) return res.status(500).send(err);
      else res.send(result);
    });
  },





}