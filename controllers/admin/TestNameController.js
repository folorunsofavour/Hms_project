var Validation = require('../../utilities/Validation');
var Model = require('../../models/Models');
var bcrypt = require('bcrypt-nodejs');


exports.TestName_List = function(request, response) {
    Model.TestNameModel.find({}).exec(function(error,result){
        if(error){
            request.flash('errorFlash', 'There was an error in finding Test Name in the database');
            response.redirect('/admin/setup/testname');
        }
        else{
            response.render('admin/setup/TestNameList',{title: 'List of Registered Test Name(s)', successFlash: request.flash('successFlash'), errorFlash: request.flash('errorFlash'), result});
        }
    });
};

exports.TestName_Add = function(request, response){
    Model.TestNameModel.find({}).exec(function(error,result){
        if(error){
            request.flash('errorFlash', 'There was an error in finding Registered Test Name(s) in the database');
            response.redirect('/admin/setup/testname');
        }
        else{
            response.render('admin/setup/TestNameAdd', {title: 'Register Test Name', errorFlash: request.flash('errorFlash'), successFlash: request.flash('successFlash'), result});
        }
    });
};

exports.TestName_Create = function(request, response){
    var name = request.body.name;

    if(Validation.IsNullOrEmpty([name])) {
        request.flash('errorFlash', 'Please fill out all fields');
        response.redirect('/admin/setup/testname/add');
    } 

    else{
        var a = new Model.TestNameModel({
            name:name
        });
        a.save(function(error){
            if(error){
                request.flash('errorFlash', 'There was an error adding a New Test Name to the database');
                response.redirect('/admin/setup/testname');
            } 
            else {
                request.flash('successFlash', 'New Test Name was Registered Successfully');
                response.redirect('/admin/setup/testname');
            }
        });
    }
};

exports.TestName_Edit = function(request, response){
    var id = request.params.id;
    
    Model.TestNameModel.findOne({ _id: id }, function(error, result){
        if(error) {
            console.log('Error');
            request.flash('errorFlash', 'There was an error finding Test Name in the database with this id');
            response.redirect('/admin/setup/testname');
        }
        else {
            response.render('admin/setup/TestNameEdit', {title: 'Edit Test Name', result, successFlash: request.flash('successFlash'), errorFlash: request.flash('errorFlash')});
        }
    });
};

exports.TestName_Update = function(request, response){ 
    var id = request.body.id;
    var name = request.body.name;
 
    if(Validation.IsNullOrEmpty([name])) {
        request.flash('errorFlash', 'Please fill out all fields'); 
        response.redirect('/admin/setup/testname');
    } 
    else{
        Model.TestNameModel.update(
            { _id: id }, 
            {
                name:name
            },
            { multi: true }, 
            function(error, result){
                if(error) {
                    console.log('Error')
                    request.flash('errorFlash', 'There was an error in Updating Test Name');
                    response.redirect('/admin/setup/testname');
                } else {
                    request.flash('successFlash', 'Test Name was updated successfully');
                    response.redirect('/admin/setup/testname');
                }        
            }
        );
    } 
};

