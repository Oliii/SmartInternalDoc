
/*
 * GET home page.
 */

 var TopicModel = require('../models/Topic').TopicModel;

exports.index = function(req, res){


	TopicModel.find(function (err, topics) {
	  if (err) {
	  	console.log('no topics');
	  }
	  console.log(topics);
	})

	//var testTopic = new TopicModel({title: 'Premier Topic', summary: 'Ceci est un test d\'ajout de topic' });

	/*testTopic.save(function(err) {
		if(err) {
			console.log(err);
			throw err;
		} else {
			console.log('topic added');
		}
	});*/
	//res.render('index', { title: 'Express', layout: 'layout' });
  	res.render('index', { title: 'Smart Technical Documentation' });
};