module.exports = {
	
	create: function(req, res) {
		console.log("req ", req);
		console.log("res ", res);

        var newEmployee = new employee(req.body);
        newEmployee.save(function(err, result) {
            if (err) return res.status(500).send(err);
            res.send(result)

        });
	}
}