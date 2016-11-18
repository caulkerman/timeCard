var OldEmployee = require("../models/api.oldEmployees.model");

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


    read: function(req, res) {
        OldEmployee.find(req.query)
        .exec(function(err, result) {
            if (err) return res.status(500).send(err);
            else res.send(result);
        });
    },



    findById: function(req, res) {
        OldEmployee.findOne({ _id: req.params.id })
        .exec(function(err, result) {
            if (err) return res.status(500).send(err);
            else res.send(result);
         });
     },



	
     delete: function(req, res) {
        OldEmployee.findByIdAndRemove(req.params.id, function(err, result) {
            if (err) return res.status(500);
            else res.send(result);
        });
    }


};