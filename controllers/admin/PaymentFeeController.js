var Validation = require('../../utilities/Validation');
var Model = require('../../models/Models');
var bcrypt = require('bcrypt-nodejs');


exports.PaymentFee_List = function(request, response) {
    Model.PaymentFeeModel.find({}).populate('department_id').exec(function(error,result){
        if(error){
            request.flash('errorFlash', 'There was an error in finding Payment Fee in the database');
            response.redirect('/admin/setup/payfee');
        }
        else{
            response.render('admin/Setup/PaymentFeeList',{title: 'List of Registered Payment Fee', successFlash: request.flash('successFlash'), errorFlash: request.flash('errorFlash'), result});
        }
    });
};

exports.PaymentFee_Add = function(request, response){
    Model.DepartmentModel.find({}).exec(function(error,result){
        if(error){
            request.flash('errorFlash', 'There was an error in finding Registered Departmentin the database');
            response.redirect('/admin/setup/payfee');
        }
        else{
            response.render('admin/setup/PaymentFeeAdd', {title: 'Register Gender', errorFlash: request.flash('errorFlash'), successFlash: request.flash('successFlash'), dept:result});
        }
    });
};

exports.PaymentFee_Create = function(request, response){
    var deptname = request.body.deptname;
    var amount = request.body.amount;

    if(Validation.IsNullOrEmpty([deptname, amount])) {
        request.flash('errorFlash', 'Please fill out all fields');
        response.redirect('/admin/setup/payfee/add');
    } 

    else{
        var a = new Model.PaymentFeeModel({
            department_id: deptname,
            amount: amount
        });
        a.save(function(error){
            if(error){
                request.flash('errorFlash', 'There was an error adding a New Payment Fee to the database');
                response.redirect('/admin/setup/payfee');
            } 
            else {
                request.flash('successFlash', 'New Payment Fee was Registered Successfully');
                response.redirect('/admin/setup/payfee');
            }
        });
    }
};

exports.PaymentFee_Edit = function(request, response){
    var id = request.params.id;
    
    Model.PaymentFeeModel.findOne({ _id: id }).populate('department_id').exec(function(error, result){
        if(error) {
            console.log('Error');
            request.flash('errorFlash', 'There was an error finding Payment Fee in the database with this id');
            response.redirect('/admin/setup/payfee');
        }
        else {
            if(result) {
                Model.DepartmentModel.find({}).exec(function(error2, result2){
					if(error2) {
                        request.flash('errorFlash', 'There was an error finding a Department in the database with this id');
                        response.redirect('/admin/setup/payfee');
                    } 
                    else {
                        response.render('admin/setup/PaymentFeeEdit', {title: 'Edit Payment Fee', result, dept:result2, successFlash: request.flash('successFlash'), errorFlash: request.flash('errorFlash')});
                    }
                });
            }
            else {
                request.flash('errorFlash', 'There was an error finding a Department in the database with this id');
                response.redirect('/admin/setup/payfee');
            }
        }
    });
};

exports.PaymentFee_Update = function(request, response){ 
    var id = request.body.id;
    var amount = request.body.amount;
 
    if(Validation.IsNullOrEmpty([amount])) {
        request.flash('errorFlash', 'Please fill out all fields'); 
        response.redirect('/admin/setup/payfee');
    } 
    else{
        Model.PaymentFeeModel.update(
            { _id: id }, 
            {
                amount:amount
            },
            { multi: true }, 
            function(error, result){
                if(error) {
                    console.log('Error')
                    request.flash('errorFlash', 'There was an error in Updating Payment Fee');
                    response.redirect('/admin/setup/payfee');
                } else {
                    request.flash('successFlash', 'Payment Fee was updated successfully');
                    response.redirect('/admin/setup/payfee');
                }        
            }
        );
    } 
};

