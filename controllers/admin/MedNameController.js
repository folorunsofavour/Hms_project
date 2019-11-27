var Validation = require('../../utilities/Validation');
var Model = require('../../models/Models');
var bcrypt = require('bcrypt-nodejs');


exports.MedName_List = function(request, response) {
    Model.MedNameModel.find({}).populate('medcategory_id').exec(function(error,result){
        if(error){
            request.flash('errorFlash', 'There was an error in finding Medicine Name in the database');
            response.redirect('/admin/setup/phar/medname');
        }
        else{
            response.render('admin/setup/pharmacy/MedNameList',{title: 'List of Registered Medicine Name(s)', successFlash: request.flash('successFlash'), errorFlash: request.flash('errorFlash'), result});
        }
    });
};

exports.MedName_Add = function(request, response){
    Model.MedCategoryModel.find({}).exec(function(error,result){
        if(error){
            request.flash('errorFlash', 'There was an error in finding Registered Medicine Name(s) in the database');
            response.redirect('/admin/setup/phar/medname');
        }
        else{
            response.render('admin/setup/pharmacy/MedNameAdd', {title: 'Register Medicine Name', errorFlash: request.flash('errorFlash'), successFlash: request.flash('successFlash'), medcategory:result});
        }
    });
};

exports.MedName_Create = function(request, response){
    var medcategory = request.body.medcategory;
    var name = request.body.name;
    var sales_price = request.body.sales_price;

    if(Validation.IsNullOrEmpty([medcategory, name, sales_price])) {
        request.flash('errorFlash', 'Please fill out all fields');
        response.redirect('/admin/setup/phar/medname/add');
    } 

    else{
        var a = new Model.MedNameModel({
            medcategory_id: medcategory,
            name:name,
            sales_price:sales_price
        });
        a.save(function(error){
            if(error){
                request.flash('errorFlash', 'There was an error adding a New Medicine Name to the database');
                response.redirect('/admin/setup/phar/medname');
            } 
            else {
                request.flash('successFlash', 'New Medicine Name was Registered Successfully');
                response.redirect('/admin/setup/phar/medname');
            }
        });
    }
};

exports.MedName_Edit = function(request, response){
    var id = request.params.id;
    
    Model.MedNameModel.findOne({ _id: id }).populate('medcategory_id').exec(function(error, result){
        if(error) {
            console.log('Error');
            request.flash('errorFlash', 'There was an error finding Medicine Name in the database with this id');
            response.redirect('/admin/setup/phar/medname');
        }
        else {
            if(result) {
                Model.MedCategoryModel.find({}).exec(function(error2, result2){
					if(error2) {
                        request.flash('errorFlash', 'There was an error finding Medicine Category in the database with this id');
                        response.redirect('/admin/setup/phar/medname');
                    } 
                    else {
                        response.render('admin/setup/pharmacy/MedNameEdit', {title: 'Edit Medicine Name', result, medcategory:result2, successFlash: request.flash('successFlash'), errorFlash: request.flash('errorFlash')});
                    }
                });
            }
            else {
                request.flash('errorFlash', 'There was an error finding Medicine Category in the database with this id');
                response.redirect('/admin/setup/phar/medname');
            }
        }
    });
};

exports.MedName_Update = function(request, response){ 
    var id = request.body.id;
    var name = request.body.name;
    var sales_price = request.body.sales_price;

    if(Validation.IsNullOrEmpty([name, sales_price])) {
        request.flash('errorFlash', 'Please fill out all fields'); 
        response.redirect('/admin/setup/phar/medname');
    } 
    else{
        Model.MedNameModel.update(
            { _id: id }, 
            {
                name:name,
                sales_price:sales_price
            },
            { multi: true }, 
            function(error, result){
                if(error) {
                    console.log('Error')
                    request.flash('errorFlash', 'There was an error in Updating Medicine Name');
                    response.redirect('/admin/setup/phar/medname');
                } else {
                    request.flash('successFlash', 'Medicine Name was updated successfully');
                    response.redirect('/admin/setup/phar/medname');
                }        
            }
        );
    } 
};

