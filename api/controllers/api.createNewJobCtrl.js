var NewJob = require("../models/api.createNewJob.model")

module.exports = {
	
	create: function(req, res) {
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



  update_jobsite: function(res, req) {
    console.log("update_jobsite res.body ", res.body);
    console.log("update_jobsite req.body ", req.body);
    NewJob.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
      if (err) return res.status(500);
      else res.send(result);
    });
  },



  update_daily_time_cards: function(req, res) {
    console.log("the res ", res.body);
    console.log("the req" , req.body);
    NewJob.findByIdAndUpdate(req.params.id, {daily_time_cards: req.body}, {new: true}, 
      function(err, result) {
        if (err) return res.status(500);
        else res.send(result);
    });
  },



  update_employees_worked: function(req, res) {
    console.log("the update employees_worked ", req.body);
    NewJob.findByIdAndUpdate(req.params.id, {employees_worked: req.body}, {new: true}, 
      function(err, result) {
        if (err) return res.status(500);
        else res.send(result);
    });
  },


  delete_job: function(req, res) {
    NewJob.findByIdAndRemove(req.params.id, function(err, result) {
      if (err) return res.status(500);
      else res.send(result);
    });
  }
 





};