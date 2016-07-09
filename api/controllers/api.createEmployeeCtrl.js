var NewEmployee = require("../models/api.createEmployee.model");


module.exports = {
	
	create: function(req, res) {
		console.log("req ", req.body);
		console.log("res ", res.body);

        var newEmployee = new NewEmployee(req.body);
        newEmployee.save(function(err, result) {
            if (err) return res.status(500).send(err);
            else res.send(result);

        });
	}
}