var Validation = require('../../utilities/Validation');
var Model = require('../../models/Models');
var bcrypt = require('bcrypt-nodejs');


exports.RaidTestFee_List = function(request, response) {
    Model.RaidTestFeeModel.find({}).populate('raidtestname_id').exec(function(error,result){
        if(error){
            request.flash('errorFlash', 'There was an error in finding Radiology Test Fee in the database');
            response.redirect('/admin/setup/raid/testfee');
        }
        else{
            response.render('admin/setup/radiology/RaidTestFeeList',{title: 'List of Registered Radiology Test Fee', successFlash: request.flash('successFlash'), errorFlash: request.flash('errorFlash'), result});
        }
    });
};

exports.RaidTestFee_Add = function(request, response){
    Model.RaidTestNameModel.find({}).exec(function(error,result){
        if(error){
            request.flash('errorFlash', 'There was an error in finding Registered Radiology Test Name in the database');
            response.redirect('/admin/setup/raid/testfee');
        }
        else{
            response.render('admin/setup/radiology/RaidTestFeeAdd', {title: 'Register Radiology Test Fee', errorFlash: request.flash('errorFlash'), successFlash: request.flash('successFlash'), raidtestname:result});
        }
    });
};

exports.RaidTestFee_Create = function(request, response){
    var raidtestname = request.body.raidtestname;
    var amount = request.body.amount;

    if(Validation.IsNullOrEmpty([raidtestname, amount])) {
        request.flash('errorFlash', 'Please fill out all fields');
        response.redirect('/admin/setup/raid/testfee/add');
    } 

    else{
        var a = new Model.RaidTestFeeModel({
            raidtestname_id: raidtestname,
            amount: amount
        });
        a.save(function(error){
            if(error){
                request.flash('errorFlash', 'There was an error adding a New Test Fee to the database');
                response.redirect('/admin/setup/raid/testfee');
            } 
            else {
                request.flash('successFlash', 'New Radiology Test Fee was Registered Successfully');
                response.redirect('/admin/setup/raid/testfee');
            }
        });
    }
};

exports.RaidTestFee_Edit = function(request, response){
    var id = request.params.id;
    
    Model.RaidTestFeeModel.findOne({ _id: id }).populate('raidtestname_id').exec(function(error, result){
        if(error) {
            console.log('Error');
            request.flash('errorFlash', 'There was an error finding Radiology Test Fee in the database with this id');
            response.redirect('/admin/setup/raid/testfee');
        }
        else {
            if(result) {
                Model.RaidTestNameModel.find({}).exec(function(error2, result2){
					if(error2) {
                        request.flash('errorFlash', 'There was an error finding a Radiology Test Name in the database with this id');
                        response.redirect('/admin/setup/raid/testfee');
                    } 
                    else {
                        response.render('admin/setup/radiology/RaidTestFeeEdit', {title: 'Edit Radiology Payment Fee', result, raidtestname:result2, successFlash: request.flash('successFlash'), errorFlash: request.flash('errorFlash')});
                    }
                });
            }
            else {
                request.flash('errorFlash', 'There was an error finding a Test Name in the database with this id');
                response.redirect('/admin/setup/raid/testfee');
            }
        }
    });
};

exports.RaidTestFee_Update = function(request, response){ 
    var id = request.body.id;
    var amount = request.body.amount;
 
    if(Validation.IsNullOrEmpty([amount])) {
        request.flash('errorFlash', 'Please fill out all fields'); 
        response.redirect('/admin/setup/raid/testfee');
    } 
    else{
        Model.RaidTestFeeModel.update(
            { _id: id }, 
            {
                amount:amount
            },
            { multi: true }, 
            function(error, result){
                if(error) {
                    console.log('Error')
                    request.flash('errorFlash', 'There was an error in Updating Radiology Test Fee');
                    response.redirect('/admin/setup/raid/testfee');
                } else {
                    request.flash('successFlash', 'Radiology Test Fee was updated successfully');
                    response.redirect('/admin/setup/raid/testfee');
                }        
            }
        );
    } 
};

