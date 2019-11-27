var Validation = require('../../utilities/Validation');
var Model = require('../../models/Models');
var bcrypt = require('bcrypt-nodejs');


exports.Pathology_List = function(request, response) {
    Model.PathologyModel.find({}).populate('consultdoctor_id').exec(function(error,result){
        if(error){
            request.flash('errorFlash', 'There was an error in finding Approved OPD(s) in the database');
            response.redirect('/admin/path');
        }
        else{
            Model.ConsultDoctorModel.find({}).exec(function(error7,consultdoctor){
                if(error7){
                    request.flash('errorFlash', 'There was an error in finding OPD in the database');
                    response.redirect('/admin/path');
                }
                else{
                    Model.OPDModel.find({}).populate('regpatient_id').exec(function(error5,opd){
                        if(error5){
                            request.flash('errorFlash', 'There was an error in finding OPD in the database');
                            response.redirect('/admin/path');
                        }
                        else{
                            Model.TestFeeModel.find({}).populate('testname_id').exec(function(error6,testfee){
                                if(error6){
                                    request.flash('errorFlash', 'There was an error in finding Test Fee in the database');
                                    response.redirect('/admin/path');
                                }
                                else{
                                    Model.TestNameModel.find({}).exec(function(error7,testname){
                                        if(error7){
                                            request.flash('errorFlash', 'There was an error in finding Test Name in the database');
                                            response.redirect('/admin/path');
                                        }
                                        else{
                                            Model.GenderModel.find({}).exec(function(error2,result2){
                                                if(error2){
                                                    request.flash('errorFlash', 'There was an error in finding Gender in the database');
                                                    response.redirect('/admin/path');
                                                }
                                                else{
                                                    Model.DepartmentModel.find({}).exec(function(error3,dept){
                                                        if(error3){
                                                            request.flash('errorFlash', 'There was an error in finding Blood Group in the database');
                                                            response.redirect('/admin/path');
                                                        }
                                                        else{
                                                            Model.PaymentFeeModel.find({}).populate('department_id').exec(function(error4,payfee){
                                                                if(error4){
                                                                    request.flash('errorFlash', 'There was an error in finding Payment Fee in the database');
                                                                    response.redirect('/admin/path');
                                                                }
                                                                else{
                                                                    
                                                                    response.render('admin/pathology/PathologyList',{title: 'List of Approved Out Door Patient(s)', successFlash: request.flash('successFlash'), errorFlash: request.flash('errorFlash'), result, result2, dept, payfee,opd,consultdoctor, testfee,testname});
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

exports.Pathology_RegDetails = function(request, response){
    var PathId = request.body.PathId;
    var dept = request.body.dept; 
    var test_name = request.body.test_name;
    var test_type = request.body.test_type;
    var report_days = request.body.report_days;
    var method = request.body.method;
    var code = request.body.code;
    var test_charges = request.body.test_charges;
    
    if(Validation.IsNullOrEmpty([dept,test_name,report_days,method,test_charges])) {
        response.send("Please fill out all fields");
        console.log("Please fill out all fields");
    } 
    else {
        Model.PathologyModel.update(
            { _id: PathId }, 
            {
                department_id: dept,
                test_name: test_name,
                test_type: test_type,
                report_days: report_days,
                method: method,
                code: code,
                test_charges: test_charges,
                status: 1
            },
            { multi: true }, 
            function(error, result){
                if(error) {
                    request.flash("errorFlash", "There was an error in Updating Patient's Pathology Details");
                    response.redirect('/admin/path');
                } else {
                    response.send("Registered Successfully");
                    console.log("Registered Successfully");    
                }
            }
        );
    }
};
