var Validation = require('../../utilities/Validation');
var Model = require('../../models/Models');
var bcrypt = require('bcrypt-nodejs');


exports.MedCategory_List = function(request, response) {
    Model.MedCategoryModel.find({}).exec(function(error,result){
        if(error){
            request.flash('errorFlash', 'There was an error in finding Medicine Category in the database');
            response.redirect('/admin/setup/phar/medcategory');
        }
        else{
            response.render('admin/setup/pharmacy/MedCategoryList',{title: 'List of Registered Medicine Category(s)', successFlash: request.flash('successFlash'), errorFlash: request.flash('errorFlash'), result});
        }
    });
};

exports.MedCategory_Add = function(request, response){
    Model.MedCategoryModel.find({}).exec(function(error,result){
        if(error){
            request.flash('errorFlash', 'There was an error in finding Registered Medicine Category(s) in the database');
            response.redirect('/admin/setup/phar/medcategory');
        }
        else{
            response.render('admin/setup/pharmacy/MedCategoryAdd', {title: 'Register Medicine Category', errorFlash: request.flash('errorFlash'), successFlash: request.flash('successFlash'), result});
        }
    });
};

exports.MedCategory_Create = function(request, response){
    var name = request.body.name;

    if(Validation.IsNullOrEmpty([name])) {
        request.flash('errorFlash', 'Please fill out all fields');
        response.redirect('/admin/setup/phar/medcategory/add');
    } 

    else{
        var a = new Model.MedCategoryModel({
            name:name
        });
        a.save(function(error){
            if(error){
                request.flash('errorFlash', 'There was an error adding a New Medicine Category to the database');
                response.redirect('/admin/setup/phar/medcategory');
            } 
            else {
                request.flash('successFlash', 'New Medicine Category was Registered Successfully');
                response.redirect('/admin/setup/phar/medcategory');
            }
        });
    }
};

exports.MedCategory_Edit = function(request, response){
    var id = request.params.id;
    
    Model.MedCategoryModel.findOne({ _id: id }, function(error, result){
        if(error) {
            console.log('Error');
            request.flash('errorFlash', 'There was an error finding Medicine Category in the database with this id');
            response.redirect('/admin/setup/phar/medcategory');
        }
        else {
            response.render('admin/setup/pharmacy/MedCategoryEdit', {title: 'Edit Medicine Category', result, successFlash: request.flash('successFlash'), errorFlash: request.flash('errorFlash')});
        }
    });
};

exports.MedCategory_Update = function(request, response){ 
    var id = request.body.id;
    var name = request.body.name;
 
    if(Validation.IsNullOrEmpty([name])) {
        request.flash('errorFlash', 'Please fill out all fields'); 
        response.redirect('/admin/setup/phar/medcattegory');
    } 
    else{
        Model.MedCategoryModel.update(
            { _id: id }, 
            {
                name:name
            },
            { multi: true }, 
            function(error, result){
                if(error) {
                    console.log('Error')
                    request.flash('errorFlash', 'There was an error in Updating Medicine Category');
                    response.redirect('/admin/setup/phar/medcategory');
                } else {
                    request.flash('successFlash', 'Medicine Category was updated successfully');
                    response.redirect('/admin/setup/phar/medcategory');
                }        
            }
        );
    } 
};

