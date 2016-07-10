var NewJob = require("../models/api.createNewJob.model")

module.exports = {
	
	create: function(req, res) {
		console.log("req in apiCreateNewJobController create", req.body);
		console.log("res in apiCreateNewJobController create", res.body);

        var newJob = new NewJob(req.body);
        newJob.save(function(err, result) {
            if (err) return res.status(500).send(err);
            else res.send(result);

        });
	},

	read: function(req, res) {
    console.log("req in apiCreateNewJobController read ", req.body);
    console.log("res in apiCreateNewJobController read ", res.body);
    NewJob.find(req.query)
    .exec(function(err, result) {
      if (err) return res.status(500).send(err);
      else res.send(result);
    });
  },


};