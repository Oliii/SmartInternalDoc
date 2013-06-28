var mongoose = require('mongoose');


var TopicSchema = new mongoose.Schema({
	title: String,
	summary: String,
	addedOn: { type: Date, default: Date.now }
});

exports.TopicModel = mongoose.model('TopicModel', TopicSchema);