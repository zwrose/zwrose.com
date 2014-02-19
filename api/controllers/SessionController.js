/**
 * AuthController
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

var bcrypt = require('bcrypt');

module.exports = {
    
  new: function(req, res){
		res.view();
	},

	create: function(req, res, next){

		// Check for username and password in params sent via the form, if none
		// redirect the browser back to the sign-in form.
		if (!req.param('username') || !req.param('password')) {

			var usernamePasswordRequiredError = [{name: 'usernamePasswordRequired', message: 'You must enter both a username and password.'}]

			// Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
			// the key of usernamePasswordRequiredError
			req.session.flash = {
				err: usernamePasswordRequiredError
			}

			res.redirect('/login');
			return;
		}

		// Try to find the user by their username. 
		// findOneByEmail() is a dynamic finder in that it searches the model by a particular attribute.
		User.findOneByUsername(req.param('username'), function foundUser (err, user) {
			if (err) return next(err);

			// If no user is found...
			if (!user) {
				var noAccountError = [{name: 'noAccount', message: 'The username ' + req.param('username') + ' was not found.'}]
				req.session.flash = {
					err: noAccountError	
				}
				res.redirect('/login');
				return;
			}

			// Compare password from the form params to the encrypted password of the user found.
			bcrypt.compare(req.param('password'), user.password, function(err, valid) {
				if (err) return next(err);

				// If the password from the form doesn't match the password from the database...
				if (!valid) {
					var usernamePasswordMismatchError = [{name: 'usernamePasswordMismatch', message: 'Invalid username and password combination.'}]
					req.session.flash = {
						err: usernamePasswordMismatchError
					}
					res.redirect('/login');
					return;
				}

				// Log user in
				req.session.authenticated = true;
				req.session.User = user;

				if(user.privileged){
					//Redirect to the blog administration page
					res.redirect('/blog/admin');	
				}else{
					//Redirect to the blog listing
					res.redirect('/blog');
				}
			});
		});
	},

	destroy: function(req, res, next){

		req.session.destroy();
		res.redirect('/blog');

	}

  
};
