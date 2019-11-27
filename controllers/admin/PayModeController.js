var Validation = require('../../utilities/Validation');
var Model = require('../../models/Models');
var bcrypt = require('bcrypt-nodejs');


exports.PayMode_List = function(request, response) {
    Model.PayModeModel.find({}).exec(function(error,result){
        if(error){
            request.flash('errorFlash', 'There was an error in finding Payment Mode in the database');
            response.redirect('/admin/setup/paymode');
        }
        else{
            response.render('admin/Setup/PayModeList',{title: 'List of Registered Payment Mode', successFlash: request.flash('successFlash'), errorFlash: request.flash('errorFlash'), result});
        }
    });
};

exports.PayMode_Add = function(request, response){
    Model.PayModeModel.find({}).exec(function(error,result){
        if(error){
            request.flash('errorFlash', 'There was an error in finding Registered Payment Mode in the database');
            response.redirect('/admin/setup/paymode');
        }
        else{
            response.render('admin/setup/PayModeAdd', {title: 'Register Payment Mode', errorFlash: request.flash('errorFlash'), successFlash: request.flash('successFlash'), result});
        }
    });
};

exports.PayMode_Create = function(request, response){
    var name = request.body.name;

    if(Validation.IsNullOrEmpty([name])) {
        request.flash('errorFlash', 'Please fill out all fields');
        response.redirect('/admin/setup/paymode/add');
    } 

    else{
        var a = new Model.PayModeModel({
            name:name
        });
        a.save(function(error){
            if(error){
                request.flash('errorFlash', 'There was an error adding a New Payment Mode to the database');
                response.redirect('/admin/setup/paymode');
            } 
            else {
                request.flash('successFlash', 'New Payment Mode was Registered Successfully');
                response.redirect('/admin/setup/paymode');
            }
        });
    }
};

exports.PayMode_Edit = function(request, response){
    var id = request.params.id;
    
    Model.PayModeModel.findOne({ _id: id }, function(error, result){
        if(error) {
            console.log('Error');
            request.flash('errorFlash', 'There was an error finding Payment Mode in the database with this id');
            response.redirect('/admin/setup/paymode');
        }
        else {
            response.render('admin/setup/PayModeEdit', {title: 'Edit Payment Mode', result, successFlash: request.flash('successFlash'), errorFlash: request.flash('errorFlash')});
        }
    });
};

exports.PayMode_Update = function(request, response){ 
    var id = request.body.id;
    var name = request.body.name;
 
    if(Validation.IsNullOrEmpty([name])) {
        request.flash('errorFlash', 'Please fill out all fields'); 
        response.redirect('/admin/setup/paymode');
    } 
    else{
        Model.PayModeModel.update(
            { _id: id }, 
            {
                name:name
            },
            { multi: true }, 
            function(error, result){
                if(error) {
                    console.log('Error')
                    request.flash('errorFlash', 'There was an error in Updating Payment Mode');
                    response.redirect('/admin/setup/paymode');
                } else {
                    request.flash('successFlash', 'Payment Mode was updated successfully');
                    response.redirect('/admin/setup/paymode');
                }        
            }
        );
    } 
};

