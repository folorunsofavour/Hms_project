var Validation = require('../../utilities/Validation');
var Model = require('../../models/Models');
var bcrypt = require('bcrypt-nodejs');


exports.ConsultDoctor_List = function(request, response) {
    Model.ConsultDoctorModel.find({}).populate('opd_id').exec(function(error,result){
        if(error){
            request.flash('errorFlash', 'There was an error in finding Approved OPD(s) in the database');
            response.redirect('/admin/consultdoctor');
        }
        else{
            Model.RegPatientModel.find({}).exec(function(error5,regpatient){
                if(error5){
                    request.flash('errorFlash', 'There was an error in finding Patient in the database');
                    response.redirect('/admin/consultdoctor');
                }
                else{
                    Model.GenderModel.find({}).exec(function(error2,result2){
                        if(error2){
                            request.flash('errorFlash', 'There was an error in finding Gender in the database');
                            response.redirect('/admin/consultdoctor');
                        }
                        else{
                            Model.DepartmentModel.find({}).exec(function(error3,dept){
                                if(error3){
                                    request.flash('errorFlash', 'There was an error in finding Blood Group in the database');
                                    response.redirect('/admin/consultdoctor');
                                }
                                else{
                                    Model.PaymentFeeModel.find({}).populate('department_id').exec(function(error4,payfee){
                                        if(error4){
                                            request.flash('errorFlash', 'There was an error in finding Payment Fee in the database');
                                            response.redirect('/admin/consultdoctor');
                                        }
                                        else{
                                            
                                            response.render('admin/consultdoctor/ConsultDoctorList',{title: 'List of Approved Out Door Patient(s)', successFlash: request.flash('successFlash'), errorFlash: request.flash('errorFlash'), result, result2, dept, payfee, regpatient});
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

exports.ConsultDoctor_RegDetails = function(request, response){
    var ConsultId = request.body.ConsultId;
    var dept = request.body.dept;
    var payfee = request.body.payfee;
    var symptom = request.body.symptom;
    var allergy = request.body.allergy;
    var doctornote = request.body.doctornote;
    
    if(Validation.IsNullOrEmpty([dept,payfee,doctornote])) {
        response.send("Please fill out all fields");
        console.log("Please fill out all fields");
    } 
    else {
        Model.ConsultDoctorModel.update(
            { _id: ConsultId }, 
            {
                symptom: symptom,
                allergy: allergy,
                department_id: dept,
                doctor_note: doctornote,
                payment_fee: payfee,
                status: 1
            },
            { multi: true }, 
            function(error, result){
                if(error) {
                    request.flash("errorFlash", "There was an error in Updating Patient's OPD Details");
                    response.redirect('/admin/consultdoctor');
                } else {
                    if(result){
                        Model.DepartmentModel.findOne({_id:dept}).exec(function(error2,result2){
                            if(error2){
                                request.flash('errorFlash', 'There was an error in finding Department in the database');
                                response.redirect('/admin/consultdoctor');
                            }
                            else{
                                console.log(ConsultId);
                                if(result2.category == "pathology"){
                                    var b = new Model.PathologyModel({
                                        consultdoctor_id:ConsultId,
                                        status: 0
                                    });
                                    b.save(function(error){
                                        if(error){
                                            request.flash('errorFlash', 'There was an error approving a Patient to the database');
                                            response.render('/admin/consultdoctor');
                                        } 
                                        else{
                                            response.send("Registered Successfully");
                                            console.log("Registered Successfully");      
                                        }
                                    }); 

                                }
                                else if(result2.category == "radiology"){
                                    var b = new Model.RadiologyModel({
                                        consultdoctor_id:ConsultId,
                                        status: 0
                                    });
                                    b.save(function(error){
                                        if(error){
                                            request.flash('errorFlash', 'There was an error approving a Patient to the database');
                                            response.render('/admin/consultdoctor');
                                        } 
                                        else{
                                            response.send("Registered Successfully");
                                            console.log("Registered Successfully");      
                                        }
                                    }); 

                                }
                                else if(result2.category == "pharmacy"){
                                    var b = new Model.PharmacyModel({
                                        consultdoctor_id:ConsultId,
                                        status: 0
                                    });
                                    b.save(function(error){
                                        if(error){
                                            request.flash('errorFlash', 'There was an error approving a Patient to the database');
                                            response.render('/admin/consultdoctor');
                                        } 
                                        else{
                                            response.send("Registered Successfully");
                                            console.log("Registered Successfully");      
                                        }
                                    }); 

                                }
                                else if(result2.category == "theatre"){
                                    var b = new Model.OpTheatreModel({
                                        consultdoctor_id:ConsultId,
                                        status: 0
                                    });
                                    b.save(function(error){
                                        if(error){
                                            request.flash('errorFlash', 'There was an error approving a Patient to the database');
                                            response.render('/admin/consultdoctor');
                                        } 
                                        else{
                                            response.send("Registered Successfully");
                                            console.log("Registered Successfully");      
                                        }
                                    }); 

                                }
                                else if(result2.category == "bloodbank"){
                                    var b = new Model.BloodBankModel({
                                        consultdoctor_id:ConsultId,
                                        status: 0
                                    });
                                    b.save(function(error){
                                        if(error){
                                            request.flash('errorFlash', 'There was an error approving a Patient to the database');
                                            response.render('/admin/consultdoctor');
                                        } 
                                        else{
                                            response.send("Registered Successfully");
                                            console.log("Registered Successfully");      
                                        }
                                    }); 

                                }
                                else{
                                    console.log("End of Process");
                                }
                            }
                        });
                        
                    }
                }
            }
        );
    }
};
