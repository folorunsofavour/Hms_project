var Model = require('../models/Models');
var Validation = require('../utilities/Validation');
var paginate = require('mongoose-paginate');

exports.Index = async (request, response) => {
   response.render('welcome/Index', {title:'Home', layout: 'ViewPage.handlebars'})
};