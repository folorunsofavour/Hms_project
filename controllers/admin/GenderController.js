var Validation = require('../../utilities/Validation');
var Model = require('../../models/Models');
var bcrypt = require('bcrypt-nodejs');


exports.Gender_List = function(request, response) {
    Model.GenderModel.find({}).exec(function(error,result){
        if(error){
            request.flash('errorFlash', 'There was an error in finding Gender in the database');
            response.redirect('/admin/setup/gender');
        }
        else{
            response.render('admin/Setup/GenderList',{title: 'List of Registered Gender', successFlash: request.flash('successFlash'), errorFlash: request.flash('errorFlash'), result});
        }
    });
};

exports.Gender_Add = function(request, response){
    Model.GenderModel.find({}).exec(function(error,result){
        if(error){
            request.flash('errorFlash', 'There was an error in finding Registered Gender in the database');
            response.redirect('/admin/setup/gender');
        }
        else{
            response.render('admin/setup/GenderAdd', {title: 'Register Gender', errorFlash: request.flash('errorFlash'), successFlash: request.flash('successFlash'), result});
        }
    });
};

exports.Gender_Create = function(request, response){
    var name = request.body.name;

    if(Validation.IsNullOrEmpty([name])) {
        request.flash('errorFlash', 'Please fill out all fields');
        response.redirect('/admin/setup/gender/add');
    } 

    else{
        var a = new Model.GenderModel({
            name:name
        });
        a.save(function(error){
            if(error){
                request.flash('errorFlash', 'There was an error adding a New Gender to the database');
                response.redirect('/admin/setup/gender');
            } 
            else {
                request.flash('successFlash', 'New Gender was Registered Successfully');
                response.redirect('/admin/setup/gender');
            }
        });
    }
};

exports.Gender_Edit = function(request, response){
    var id = request.params.id;
    
    Model.GenderModel.findOne({ _id: id }, function(error, result){
        if(error) {
            console.log('Error');
            request.flash('errorFlash', 'There was an error finding Gender in the database with this id');
            response.redirect('/admin/setup/gender');
        }
        else {
            response.render('admin/setup/GenderEdit', {title: 'Edit Gender', result, successFlash: request.flash('successFlash'), errorFlash: request.flash('errorFlash')});
        }
    });
};

exports.Gender_Update = function(request, response){ 
    var id = request.body.id;
    var name = request.body.name;
 
    if(Validation.IsNullOrEmpty([name])) {
        request.flash('errorFlash', 'Please fill out all fields'); 
        response.redirect('/admin/setup/gender');
    } 
    else{
        Model.GenderModel.update(
            { _id: id }, 
            {
                name:name
            },
            { multi: true }, 
            function(error, result){
                if(error) {
                    console.log('Error')
                    request.flash('errorFlash', 'There was an error in Updating Gender');
                    response.redirect('/admin/setup/gender');
                } else {
                    request.flash('successFlash', 'Gender was updated successfully');
                    response.redirect('/admin/setup/gender');
                }        
            }
        );
    } 
};

