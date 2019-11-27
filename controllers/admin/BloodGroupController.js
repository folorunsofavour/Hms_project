var Validation = require('../../utilities/Validation');
var Model = require('../../models/Models');
var bcrypt = require('bcrypt-nodejs');


exports.BloodGroup_List = function(request, response) {
    Model.BloodGroupModel.find({}).exec(function(error,result){
        if(error){
            request.flash('errorFlash', 'There was an error in finding Blood Group in the database');
            response.redirect('/admin/setup/bloodgroup');
        }
        else{
            response.render('admin/Setup/BloodGroupList',{title: 'List of Registered Blood Group', successFlash: request.flash('successFlash'), errorFlash: request.flash('errorFlash'), result});
        }
    });
};

exports.BloodGroup_Add = function(request, response){
    Model.BloodGroupModel.find({}).exec(function(error,result){
        if(error){
            request.flash('errorFlash', 'There was an error in finding Registered Blood Group in the database');
            response.redirect('/admin/setup/bloodgroup');
        }
        else{
            response.render('admin/setup/BloodGroupAdd', {title: 'Register Blood Group', errorFlash: request.flash('errorFlash'), successFlash: request.flash('successFlash'), result});
        }
    });
};

exports.BloodGroup_Create = function(request, response){
    var name = request.body.name;

    if(Validation.IsNullOrEmpty([name])) {
        request.flash('errorFlash', 'Please fill out all fields');
        response.redirect('/admin/setup/bloodgroup/add');
    } 

    else{
        var a = new Model.BloodGroupModel({
            name:name
        });
        a.save(function(error){
            if(error){
                request.flash('errorFlash', 'There was an error adding a New Blood Group to the database');
                response.redirect('/admin/setup/bloodgroup');
            } 
            else {
                request.flash('successFlash', 'New Blood Group was Registered Successfully');
                response.redirect('/admin/setup/bloodgroup');
            }
        });
    }
};

exports.BloodGroup_Edit = function(request, response){
    var id = request.params.id;
    
    Model.BloodGroupModel.findOne({ _id: id }, function(error, result){
        if(error) {
            console.log('Error');
            request.flash('errorFlash', 'There was an error finding Blood Group in the database with this id');
            response.redirect('/admin/setup/bloodgroup');
        }
        else {
            response.render('admin/setup/BloodGroupEdit', {title: 'Edit Blood Group', result, successFlash: request.flash('successFlash'), errorFlash: request.flash('errorFlash')});
        }
    });
};

exports.BloodGroup_Update = function(request, response){ 
    var id = request.body.id;
    var name = request.body.name;
 
    if(Validation.IsNullOrEmpty([name])) {
        request.flash('errorFlash', 'Please fill out all fields'); 
        response.redirect('/admin/setup/bloodgroup');
    } 
    else{
        Model.BloodGroupModel.update(
            { _id: id }, 
            {
                name:name
            },
            { multi: true }, 
            function(error, result){
                if(error) {
                    console.log('Error')
                    request.flash('errorFlash', 'There was an error in Updating Blood Group');
                    response.redirect('/admin/setup/bloodgroup');
                } else {
                    request.flash('successFlash', 'Blood Group was updated successfully');
                    response.redirect('/admin/setup/bloodgroup');
                }        
            }
        );
    } 
};

