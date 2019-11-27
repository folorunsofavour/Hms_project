var Validation = require('../../utilities/Validation');
var Model = require('../../models/Models');
var bcrypt = require('bcrypt-nodejs');


exports.TestFee_List = function(request, response) {
    Model.TestFeeModel.find({}).populate('testname_id').exec(function(error,result){
        if(error){
            request.flash('errorFlash', 'There was an error in finding Test Fee in the database');
            response.redirect('/admin/setup/testfee');
        }
        else{
            response.render('admin/Setup/TestFeeList',{title: 'List of Registered Test Fee', successFlash: request.flash('successFlash'), errorFlash: request.flash('errorFlash'), result});
        }
    });
};

exports.TestFee_Add = function(request, response){
    Model.TestNameModel.find({}).exec(function(error,result){
        if(error){
            request.flash('errorFlash', 'There was an error in finding Registered Test Name in the database');
            response.redirect('/admin/setup/testfee');
        }
        else{
            response.render('admin/setup/TestFeeAdd', {title: 'Register Test Fee', errorFlash: request.flash('errorFlash'), successFlash: request.flash('successFlash'), testname:result});
        }
    });
};

exports.TestFee_Create = function(request, response){
    var testname = request.body.testname;
    var amount = request.body.amount;

    if(Validation.IsNullOrEmpty([testname, amount])) {
        request.flash('errorFlash', 'Please fill out all fields');
        response.redirect('/admin/setup/testfee/add');
    } 

    else{
        var a = new Model.TestFeeModel({
            testname_id: testname,
            amount: amount
        });
        a.save(function(error){
            if(error){
                request.flash('errorFlash', 'There was an error adding a New Test Fee to the database');
                response.redirect('/admin/setup/testfee');
            } 
            else {
                request.flash('successFlash', 'New Test Fee was Registered Successfully');
                response.redirect('/admin/setup/testfee');
            }
        });
    }
};

exports.TestFee_Edit = function(request, response){
    var id = request.params.id;
    
    Model.TestFeeModel.findOne({ _id: id }).populate('testname_id').exec(function(error, result){
        if(error) {
            console.log('Error');
            request.flash('errorFlash', 'There was an error finding Test Fee in the database with this id');
            response.redirect('/admin/setup/testfee');
        }
        else {
            if(result) {
                Model.TestNameModel.find({}).exec(function(error2, result2){
					if(error2) {
                        request.flash('errorFlash', 'There was an error finding a Test Name in the database with this id');
                        response.redirect('/admin/setup/testfee');
                    } 
                    else {
                        response.render('admin/setup/TestFeeEdit', {title: 'Edit Payment Fee', result, testname:result2, successFlash: request.flash('successFlash'), errorFlash: request.flash('errorFlash')});
                    }
                });
            }
            else {
                request.flash('errorFlash', 'There was an error finding a Test Name in the database with this id');
                response.redirect('/admin/setup/testfee');
            }
        }
    });
};

exports.TestFee_Update = function(request, response){ 
    var id = request.body.id;
    var amount = request.body.amount;
 
    if(Validation.IsNullOrEmpty([amount])) {
        request.flash('errorFlash', 'Please fill out all fields'); 
        response.redirect('/admin/setup/testfee');
    } 
    else{
        Model.TestFeeModel.update(
            { _id: id }, 
            {
                amount:amount
            },
            { multi: true }, 
            function(error, result){
                if(error) {
                    console.log('Error')
                    request.flash('errorFlash', 'There was an error in Updating Test Fee');
                    response.redirect('/admin/setup/testfee');
                } else {
                    request.flash('successFlash', 'Test Fee was updated successfully');
                    response.redirect('/admin/setup/testfee');
                }        
            }
        );
    } 
};

