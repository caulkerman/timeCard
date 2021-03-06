var NewEmployee = require("../models/api.createEmployee.model");


module.exports = {
	
	create: function(req, res) {
		// console.log("req in apiCreateEmployeeController create", req.body);
		// console.log("res in apiCreateEmployeeController create", res.body);

        var newEmployee = new NewEmployee(req.body);
        newEmployee.save(function(err, result) {
            if (err) return res.status(500).send(err);
            else res.send(result);

        });
	},


	read: function(req, res) {
    // console.log("req in apiCreateEmployeeController read ", req.body);
    // console.log("res in apiCreateEmployeeController read ", res.body);
    NewEmployee.find(req.query)
    .exec(function(err, result) {
      if (err) return res.status(500).send(err);
      else res.send(result);
    });
  },

  findById: function(req, res) {
    // console.log("req in apiCreateEmployeeController read ", req.body);
    // console.log("res in apiCreateEmployeeController read ", res.body);
    NewEmployee.findOne({_id: req.params.id })
    .exec(function(err, result) {
      if (err) return res.status(500).send(err);
      else res.send(result);
    });
  },


  update: function(req, res) {
    NewEmployee.findByIdAndUpdate(req.params.id, {job_site_hours_worked: req.body}, {new: true}, 
      function(err, result) {
        if (err) return res.status(500);
        else res.send(result);
    });
  },



 delete: function(req, res) {
    NewEmployee.findByIdAndRemove(req.params.id, function(err, result) {
      if (err) return res.status(500);
      else res.send(result);
    });
  }





}