var Validation = require('../../utilities/Validation');
var Model = require('../../models/Models');
var bcrypt = require('bcrypt-nodejs');


exports.Department_List = function(request, response) {
    Model.DepartmentModel.find({}).exec(function(error,result){
        if(error){
            request.flash('errorFlash', 'There was an error in finding Department in the database');
            response.redirect('/admin/setup/dept');
        }
        else{
            response.render('admin/Setup/DepartmentList',{title: 'List of Registered Department', successFlash: request.flash('successFlash'), errorFlash: request.flash('errorFlash'), result});
        }
    });
};

exports.Department_Add = function(request, response){
    Model.DepartmentModel.find({}).exec(function(error,result){
        if(error){
            request.flash('errorFlash', 'There was an error in finding Registered Department in the database');
            response.redirect('/admin/setup/dept');
        }
        else{
            response.render('admin/setup/DepartmentAdd', {title: 'Register Department', errorFlash: request.flash('errorFlash'), successFlash: request.flash('successFlash'), result});
        }
    });
};

exports.Department_Create = function(request, response){
    var name = request.body.name;
    var category = request.body.category;

    if(Validation.IsNullOrEmpty([name,category])) {
        request.flash('errorFlash', 'Please fill out all fields');
        response.redirect('/admin/setup/dept/add');
    } 

    else{
        var a = new Model.DepartmentModel({
            name:name,
            category:category
        });
        a.save(function(error){
            if(error){
                request.flash('errorFlash', 'There was an error adding a New Department to the database');
                response.redirect('/admin/setup/dept');
            } 
            else {
                request.flash('successFlash', 'New Department was Registered Successfully');
                response.redirect('/admin/setup/dept');
            }
        });
    }
};

exports.Department_Edit = function(request, response){
    var id = request.params.id;
    
    Model.DepartmentModel.findOne({ _id: id }, function(error, result){
        if(error) {
            console.log('Error');
            request.flash('errorFlash', 'There was an error finding Department in the database with this id');
            response.redirect('/admin/setup/dept');
        }
        else {
            response.render('admin/setup/DepartmentEdit', {title: 'Edit Department', result, successFlash: request.flash('successFlash'), errorFlash: request.flash('errorFlash')});
        }
    });
};

exports.Department_Update = function(request, response){ 
    var id = request.body.id;
    var name = request.body.name;
 
    if(Validation.IsNullOrEmpty([name])) {
        request.flash('errorFlash', 'Please fill out all fields'); 
        response.redirect('/admin/setup/dept');
    } 
    else{
        Model.DepartmentModel.update(
            { _id: id }, 
            {
                name:name
            },
            { multi: true }, 
            function(error, result){
                if(error) {
                    console.log('Error')
                    request.flash('errorFlash', 'There was an error in Updating Department');
                    response.redirect('/admin/setup/dept');
                } else {
                    request.flash('successFlash', 'Department was updated successfully');
                    response.redirect('/admin/setup/dept');
                }        
            }
        );
    } 
};

