var mongoose = require('mongoose');


var ComponentSchema = new mongoose.Schema({
	title: String,
	summary: String,
	techno: {type: String, enum: ['angularjs', 'jquery', 'asp.net']},
	type: {type: String, enum: ['directive', 'filter', 'service', 'plugin']},
	fileSrc: String,
	thumbnail: String,
	addedOn: { type: Date, default: Date.now }
});

var ComponentModel = mongoose.model('ComponentModel', ComponentSchema);

// GET /components
exports.findAll = function(req, res) {
	console.log('findAll');
	ComponentModel.find(function (err, components) {
	  if (err) {
	  	console.log(err);
	  	res.send(500);
	  }
	  console.log(components);
	  res.send(components);
	});
}

// GET /components/:id
exports.findById = function(req, res) {
	console.log('findById : ' + req.params.id);
	var id = req.params.id;
	ComponentModel.find({_id: id}, function(err, component) {
		if(err) {
			console.log(err);
			res.send(500, err);
		}
		console.log(component);
		res.send(component);
	})
}


// POST /components
exports.save = function(req, res) {
	console.log(req.body);
	var reqComponent = req.body;

	// update
	if(reqComponent._id != undefined) {
		update(reqComponent, function(err, updatedComponent) {
			if(err) {
				console.log(err);
				res.send(500);
			}
			res.send(updatedComponent);
		});
	}
	// create
	else {
		create(reqComponent, function(err) {
			if(err) {
				console.log(err);
				res.send(500);
			}
		});
	}
}

function update(component, callback) {
	ComponentModel.findOne({_id: component._id}, function (err, c) {
		if(err) {
			callback(err, undefined);
			return;
		}
		if(c != undefined) {
			// update it
			c = component;
			c.save(function(err) {
				if(err != undefined) {
					callback(err);
					return;
				} else {
					callback(undefined, c);
					return;
				}
			});
		}
	});
}

function create(component, callback) {
	
	// Clear the title to create a folder
	var folderName = component.title.replace(/[^\w\d_]/gi, "");

	// Check if the component already exists in folders
	fs.stat('/public/uploadedFiles/components/' + folderName, function(err, s) {
		if(err || !s.isDirectory()) {
			callback(err);
			return;
		}

		// Folder does not yet exist --> save the new component
		component.save(function(err, newComponent) {
			if(err) {
				callback(err);
				return;
			}
			// Create the folder which will contains the doc files
			fs.mkdir('/public/uploadedFiles/components/' + folderName, function(err) {
				if(err) {
					callback(err);
					return;
				}

				callback(undefined, newComponent);	
			});
		});
	});
}

// DELETE /components/:id
exports.delete = function(req, res) {
	ComponentModel.findOne({_id : req.params.id}).remove();

}

