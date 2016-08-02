var NewJob = require("../models/api.createNewJob.model")

module.exports = {
	
	create: function(req, res) {
		// console.log("req in apiCreateNewJobController create", req.body);
		// console.log("res in apiCreateNewJobController create", res.body);

  var newJob = new NewJob(req.body);
    newJob.save(function(err, result) {
        if (err) return res.status(500).send(err);
        else res.send(result);
    });
	},

	read: function(req, res) {
    NewJob.find(req.query)
    .exec(function(err, result) {
      if (err) return res.status(500).send(err);
      else res.send(result);
    });
  },

  findById: function(req, res) {
    NewJob.findOne({ _id: req.params.id })
    .exec(function(err, result) {
      if (err) return res.status(500).send(err);
      else res.send(result);
    });
  },


  update: function(req, res) {
    NewJob.findByIdAndUpdate(req.params.id, {employees: req.body}, {new: true}, 
      function(err, result) {
        if (err) return res.status(500);
        else res.send(result);
    });
  }

 





};