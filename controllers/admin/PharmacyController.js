var Validation = require('../../utilities/Validation');
var Model = require('../../models/Models');
var bcrypt = require('bcrypt-nodejs');


exports.Pharmacy_List = function(request, response) {
    Model.PharmacyModel.find({}).populate('consultdoctor_id').exec(function(error,result){
        if(error){
            request.flash('errorFlash', 'There was an error in finding Approved OPD(s) in the database');
            response.redirect('/admin/phar');
        }
        else{
            Model.ConsultDoctorModel.find({}).exec(function(error7,consultdoctor){
                if(error7){
                    request.flash('errorFlash', 'There was an error in finding OPD in the database');
                    response.redirect('/admin/phar');
                }
                else{
                    Model.OPDModel.find({}).populate('regpatient_id').exec(function(error5,opd){
                        if(error5){
                            request.flash('errorFlash', 'There was an error in finding OPD in the database');
                            response.redirect('/admin/phar');
                        }
                        else{
                            Model.MedNameModel.find({}).populate('medcategory_id').exec(function(error6,medname){
                                if(error6){
                                    request.flash('errorFlash', 'There was an error in finding Medicine Name in the database');
                                    response.redirect('/admin/phar');
                                }
                                else{
                                    Model.TestNameModel.find({}).exec(function(error7,testname){
                                        if(error7){
                                            request.flash('errorFlash', 'There was an error in finding Test Name in the database');
                                            response.redirect('/admin/phar');
                                        }
                                        else{
                                            Model.GenderModel.find({}).exec(function(error2,result2){
                                                if(error2){
                                                    request.flash('errorFlash', 'There was an error in finding Gender in the database');
                                                    response.redirect('/admin/phar');
                                                }
                                                else{
                                                    Model.DepartmentModel.find({}).exec(function(error3,dept){
                                                        if(error3){
                                                            request.flash('errorFlash', 'There was an error in finding Blood Group in the database');
                                                            response.redirect('/admin/phar');
                                                        }
                                                        else{
                                                            Model.PaymentFeeModel.find({}).populate('department_id').exec(function(error4,payfee){
                                                                if(error4){
                                                                    request.flash('errorFlash', 'There was an error in finding Payment Fee in the database');
                                                                    response.redirect('/admin/phar');
                                                                }
                                                                else{
                                                                    
                                                                    response.render('admin/pharmacy/PharmacyList',{title: 'List of Approved Out Door Patient(s)', successFlash: request.flash('successFlash'), errorFlash: request.flash('errorFlash'), result, result2, dept, payfee,opd,consultdoctor, medname,testname});
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

exports.Pharmacy_RegDetails = function(request, response){
    var PharId = request.body.PharId;
    var medname_id = request.body.medname; 
    var expirydate = request.body.expiry;
    var quantity = request.body.quantity;
    var amount = request.body.amount;
    
    if(Validation.IsNullOrEmpty([medname_id,expirydate,quantity,amount])) {
        response.send("Please fill out all fields");
        console.log("Please fill out all fields");
    } 
    else {
        Model.PharmacyModel.update(
            { _id: PharId }, 
            {
                medname_id: medname_id,
                expirydate: expirydate,
                quantity: quantity,
                amount: amount,
                status: 1
            },
            { multi: true }, 
            function(error, result){
                if(error) {
                    request.flash("errorFlash", "There was an error in Updating Patient's Pharmacy Details");
                    response.redirect('/admin/phar');
                } else {
                    response.send("Registered Successfully");
                    console.log("Registered Successfully");    
                }
            }
        );
    }
};
