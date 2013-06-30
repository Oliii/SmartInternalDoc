var mongoose = require('mongoose');


var ComponentSchema = new mongoose.Schema({
	title: String,
	summary: String,
	fileSrc: String,
	thumbnail: String,
	addedOn: { type: Date, default: Date.now }
});

var ComponentModel = mongoose.model('ComponentModel', ComponentSchema);

function Component(obj) {
	if(obj != undefined) {
		this.initWithValue(obj);
	} else {
		this.init;
	}
}

Component.prototype.init = function () {
	this.model = new ComponentModel();
}

Component.prototype.initWithValue = function(obj) {
	this.model = new ComponentModel({
		title: obj.title,
		summary: obj.summary,
		fileSrc: obj.fileSrc,
	 	thumbnail: obj.thumbnail
	});
	

}

Component.getAll = function(req, res) {
	ComponentModel.find(function (err, components) {
	  if (err) {
	  	console.log(err);
	  	res.send(500);
	  }
	  console.log(components);
	  res.send(components);
	});
}

Component.findById = function(req, res) {
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

Component.save = function(req, res) {
	console.log(req.body);
	var newComponent = new ComponentModel(req.body);
	newComponent.save(function(err, newComponent) {
		if(err) {
			console.log(err);
			res.send(500);
		}
		res.send(newComponent);
	})
}

exports.Component = Component;

