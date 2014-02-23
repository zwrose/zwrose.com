/**
 * BlogController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  new: function(req, res){
		res.view();
	},

  admin: function(req, res){
  	
  	Blog.find().sort('pubDate DESC').done(function(err, articles){
  		if(err) return next(err);
			res.view({
				articles: articles
			});
  	});
  	
  },

  index: function(req, res){

  	Blog.find().sort('pubDate DESC').done(function(err, articles){
  		if(err) return next(err);
			res.view({
				articles: articles
			});
  	});
  	
  },

  create: function(req, res, next){

  	Blog.create(req.params.all(), function postCreated(err, article){

  		if(err){
  			req.session.flash = {
  				err: err
  			}

  			return res.redirect('/blog');
  		}

  		res.redirect('/blog');

  	});

  },

  edit: function(req, res, next){

    Blog.findOne(req.param('id'),function foundUser(err, article){
      if(err) return next(err);
      if(!article) return next('User doesn\'t exist.');

      res.view({
        article: article
      });
    });
  },




  

  
};
