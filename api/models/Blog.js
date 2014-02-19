/**
 * Blog
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	schema: true,

  attributes: {
  	
  	title: {
			type: 'string',
			required: true
  	},

  	author: {
  		type: 'string',
  		required: true
  	},

  	pubDate: {
  		type: 'date',
  		required: true
  	},

  	published: {
  		type: 'boolean',
  		defaultsTo: false
  	},

  	body: {
  		type: 'text'
  	}
    
  }

};
