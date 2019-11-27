var Validation = require('../../utilities/Validation');
var Model = require('../../models/Models');
var bcrypt = require('bcrypt-nodejs');


exports.OPD_List = function(request, response) {
    Model.OPDModel.find({}).populate('regpatient_id').exec(function(error,result){
        if(error){
            request.flash('errorFlash', 'There was an error in finding OPD(s) in the database');
            response.redirect('/admin/opd');
        }
        else{
            Model.GenderModel.find({}).exec(function(error2,result2){
                if(error2){
                    request.flash('errorFlash', 'There was an error in finding Gender in the database');
                    response.redirect('/admin/opd');
                }
                else{
                    Model.BloodGroupModel.find({}).exec(function(error3,bloodgroup){
                        if(error3){
                            request.flash('errorFlash', 'There was an error in finding Blood Group in the database');
                            response.redirect('/admin/opd');
                        }
                        else{
                            Model.PayModeModel.find({}).exec(function(error4,paymode){
                                if(error4){
                                    request.flash('errorFlash', 'There was an error in finding Payment Mode in the database');
                                    response.redirect('/admin/opd');
                                }
                                else{
                                    Model.PaymentFeeModel.find({}).populate('department_id').exec(function(error4,payfee){
                                        if(error4){
                                            request.flash('errorFlash', 'There was an error in finding Payment Fee in the database');
                                            response.redirect('/admin/consultdoctor');
                                        }
                                        else{
                                            response.render('admin/opd/OPDList',{title: 'List of Out Door Patient(s)', successFlash: request.flash('successFlash'), errorFlash: request.flash('errorFlash'), result, result2, bloodgroup, paymode,payfee});
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

exports.OPD_RegDetails = function(request, response){
    // var Patient_Name = request.body.PatientName;
    // var Patient_ID = request.body.PatientID;
    // var Gender = request.body.Gender;
    var OPDId = request.body.OPDId;
    var RegPatientId = request.body.RegPatientId;
    var age = request.body.age;
    var bloodgroup = request.body.bloodgroup;
    var height = request.body.height;
    var weight = request.body.weight;
    var bloodpressure = request.body.bloodpressure;
    var amount = request.body.amount;
    var paymode = request.body.paymode;
    var note = request.body.note;
    
    if(Validation.IsNullOrEmpty([age,bloodgroup,height,weight,bloodpressure,amount,paymode])) {
        response.send("Please fill out all fields");
        console.log("Please fill out all fields");
        console.log(RegPatientId);
    } 
    else {
        Model.OPDModel.update(
            { _id: OPDId }, 
            {
                age: age,
                blood_group: bloodgroup,
                height: height,
                weight: weight,
                blood_pressure: bloodpressure,
                amount: amount,
                payment_mode: paymode,
                note: note,
                status: 1
            },
            { multi: true }, 
            function(error, result){
                if(error) {
                    request.flash("errorFlash", "There was an error in Updating Patient's OPD Details");
                    response.redirect('/admin/opd');
                } else 
                {
                    var b = new Model.ConsultDoctorModel({
                        opd_id:OPDId,
                        status: 0
                    });
                    b.save(function(error){
                        if(error){
                            request.flash('errorFlash', 'There was an error approving an OPD to the database');
                            response.render('/admin/opd');
                        } 
                        else{
                            response.send("Registered Successfully");
                            console.log("Registered Successfully");      
                        }
                    }); 
                }        
            }
        );
    }
};
