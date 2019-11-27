var Validation = require('../../utilities/Validation');
var Model = require('../../models/Models');
var bcrypt = require('bcrypt-nodejs');


exports.Radiology_List = function(request, response) {
    Model.RadiologyModel.find({}).populate('consultdoctor_id').exec(function(error,result){
        if(error){
            request.flash('errorFlash', 'There was an error in finding Approved OPD(s) in the database');
            response.redirect('/admin/raid');
        }
        else{
            Model.ConsultDoctorModel.find({}).exec(function(error7,consultdoctor){
                if(error7){
                    request.flash('errorFlash', 'There was an error in finding OPD in the database');
                    response.redirect('/admin/raid');
                }
                else{
                    Model.OPDModel.find({}).populate('regpatient_id').exec(function(error5,opd){
                        if(error5){
                            request.flash('errorFlash', 'There was an error in finding OPD in the database');
                            response.redirect('/admin/raid');
                        }
                        else{
                            Model.RaidTestFeeModel.find({}).populate('raidtestname_id').exec(function(error6,raidtestfee){
                                if(error6){
                                    request.flash('errorFlash', 'There was an error in finding Radiology Test Fee in the database');
                                    response.redirect('/admin/raid');
                                }
                                else{
                                    Model.RaidTestNameModel.find({}).exec(function(error7,raidtestname){
                                        if(error7){
                                            request.flash('errorFlash', 'There was an error in finding Radiology Test Name in the database');
                                            response.redirect('/admin/raid');
                                        }
                                        else{
                                            Model.GenderModel.find({}).exec(function(error2,result2){
                                                if(error2){
                                                    request.flash('errorFlash', 'There was an error in finding Gender in the database');
                                                    response.redirect('/admin/raid');
                                                }
                                                else{
                                                    Model.DepartmentModel.find({}).exec(function(error3,dept){
                                                        if(error3){
                                                            request.flash('errorFlash', 'There was an error in finding Blood Group in the database');
                                                            response.redirect('/admin/raid');
                                                        }
                                                        else{
                                                            Model.PaymentFeeModel.find({}).populate('department_id').exec(function(error4,payfee){
                                                                if(error4){
                                                                    request.flash('errorFlash', 'There was an error in finding Payment Fee in the database');
                                                                    response.redirect('/admin/raid');
                                                                }
                                                                else{
                                                                    
                                                                    response.render('admin/radiology/RadiologyList',{title: 'List of Approved Out Door Patient(s)', successFlash: request.flash('successFlash'), errorFlash: request.flash('errorFlash'), result, result2, dept, payfee,opd,consultdoctor, raidtestfee,raidtestname});
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
          }
    });
};

exports.Radiology_RegDetails = function(request, response){
    var RaidId = request.body.RaidId;
    var dept = request.body.dept; 
    var test_name = request.body.test_name;
    var test_type = request.body.test_type;
    var report_days = request.body.report_days;
    var code = request.body.code;
    var test_charges = request.body.test_charges;
    
    if(Validation.IsNullOrEmpty([dept,test_name,report_days,test_charges])) {
        response.send("Please fill out all fields");
        console.log("Please fill out all fields");
    } 
    else {
        Model.RadiologyModel.update(
            { _id: RaidId }, 
            {
                department_id: dept,
                test_name: test_name,
                test_type: test_type,
                report_days: report_days,
                code: code,
                test_charges: test_charges,
                status: 1
            },
            { multi: true }, 
            function(error, result){
                if(error) {
                    request.flash("errorFlash", "There was an error in Updating Patient's Radiology Details");
                    response.redirect('/admin/raid');
                } else {
                    response.send("Registered Successfully");
                    console.log("Registered Successfully");    
                }
            }
        );
    }
};
