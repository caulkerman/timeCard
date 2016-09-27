var OldJob = require("../models/api.oldJobSites.model")

module.exports = {


    create: function(req, res) {
        console.log("the res.body: ", res.body);
        console.log("the req.body: ", req.body);
    var oldJob = new OldJob(req.body);
      oldJob.save(function(err, result) {
          if (err) return res.status(500).send(err);
          else res.send(result);
      });
	},



    read: function(req, res) {
        OldJob.find(req.query)
        .exec(function(err, result) {
            if (err) return res.status(500).send(err);
            else res.send(result);
        });
    },



    findById: function(req, res) {
        OldJob.findOne({ _id: req.params.id })
        .exec(function(err, result) {
            if (err) return res.status(500).send(err);
            else res.send(result);
         });
     },



     delete: function(req, res) {
        OldJob.findByIdAndRemove(req.params.id, function(err, result) {
            if (err) return res.status(500);
            else res.send(result);
        });
    }



}