var Validation = require('../../utilities/Validation');
var Model = require('../../models/Models');
var bcrypt = require('bcrypt-nodejs');

exports.Dashboard = function(request, response) {
    response.render('admin/Index', {title: 'Admin Dashboard' ,successFlash: request.flash('successFlash'), errorFlash: request.flash('errorFlash')});
};