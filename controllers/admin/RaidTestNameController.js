var Validation = require('../../utilities/Validation');
var Model = require('../../models/Models');
var bcrypt = require('bcrypt-nodejs');


exports.RaidTestName_List = function(request, response) {
    Model.RaidTestNameModel.find({}).exec(function(error,result){
        if(error){
            request.flash('errorFlash', 'There was an error in finding Radiology Test Name in the database');
            response.redirect('/admin/setup/raid/testname');
        }
        else{
            response.render('admin/setup/radiology/RaidTestNameList',{title: 'List of Registered Radiology Test Name(s)', successFlash: request.flash('successFlash'), errorFlash: request.flash('errorFlash'), result});
        }
    });
};

exports.RaidTestName_Add = function(request, response){
    Model.RaidTestNameModel.find({}).exec(function(error,result){
        if(error){
            request.flash('errorFlash', 'There was an error in finding Registered Radiology Test Name(s) in the database');
            response.redirect('/admin/setup/raid/testname');
        }
        else{
            response.render('admin/setup/radiology/RaidTestNameAdd', {title: 'Register Radiology Test Name', errorFlash: request.flash('errorFlash'), successFlash: request.flash('successFlash'), result});
        }
    });
};

exports.RaidTestName_Create = function(request, response){
    var name = request.body.name;

    if(Validation.IsNullOrEmpty([name])) {
        request.flash('errorFlash', 'Please fill out all fields');
        response.redirect('/admin/setup/raid/testname/add');
    } 

    else{
        var a = new Model.RaidTestNameModel({
            name:name
        });
        a.save(function(error){
            if(error){
                request.flash('errorFlash', 'There was an error adding a New Radiology Test Name to the database');
                response.redirect('/admin/setup/raid/testname');
            } 
            else {
                request.flash('successFlash', 'New Radiology Test Name was Registered Successfully');
                response.redirect('/admin/setup/raid/testname');
            }
        });
    }
};

exports.RaidTestName_Edit = function(request, response){
    var id = request.params.id;
    
    Model.RaidTestNameModel.findOne({ _id: id }, function(error, result){
        if(error) {
            console.log('Error');
            request.flash('errorFlash', 'There was an error finding Radiology Test Name in the database with this id');
            response.redirect('/admin/setup/raid/testname');
        }
        else {
            response.render('admin/setup/radiology/RaidTestNameEdit', {title: 'Edit Radiology Test Name', result, successFlash: request.flash('successFlash'), errorFlash: request.flash('errorFlash')});
        }
    });
};

exports.RaidTestName_Update = function(request, response){ 
    var id = request.body.id;
    var name = request.body.name;
 
    if(Validation.IsNullOrEmpty([name])) {
        request.flash('errorFlash', 'Please fill out all fields'); 
        response.redirect('/admin/setup/raid/testname');
    } 
    else{
        Model.RaidTestNameModel.update(
            { _id: id }, 
            {
                name:name
            },
            { multi: true }, 
            function(error, result){
                if(error) {
                    console.log('Error')
                    request.flash('errorFlash', 'There was an error in Updating Radiology Test Name');
                    response.redirect('/admin/setup/raid/testname');
                } else {
                    request.flash('successFlash', 'Radiology Test Name was updated successfully');
                    response.redirect('/admin/setup/raid/testname');
                }        
            }
        );
    } 
};

