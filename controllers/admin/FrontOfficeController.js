var Validation = require('../../utilities/Validation');
var Model = require('../../models/Models');
var bcrypt = require('bcrypt-nodejs');

//RegPatient
exports.RegPatient_List = function(request, response) {
    Model.RegPatientModel.find({}).populate('gender').exec(function(error,result){
        if(error){
            request.flash('errorFlash', 'There was an error in finding Registered Patient(s) in the database');
            response.redirect('/admin/frontoffice/regpatient');
        }
        else{
            response.render('admin/frontoffice/RegPatientList',{title: 'List of Registered Patient(s)', successFlash: request.flash('successFlash'), errorFlash: request.flash('errorFlash'), result});
        }
    });
};


exports.RegPatient_Approve = function(request, response){ 
    var id = request.params.id;
   
        Model.RegPatientModel.update(
            { _id: id }, 
            {
                status: 1
            },
            { multi: true }, 
            function(error, result){
                if(error) {
                    console.log('Error')
                    request.flash('errorFlash', 'There was an error in Approving this Patient New Issue!');
                    response.redirect('/admin/frontoffice/regpatient');
                } 
                else {
                    var a = new Model.OPDModel({
                        regpatient_id:id,
                        status: '0'
                    });
                    a.save(function(error,result){
                        if(error){
                            request.flash('errorFlash', 'There was an error adding an OPD to the database');
                            response.render('/admin/frontoffice/regpatient');
                        } 
                        else{
                            request.flash('successFlash', 'Patient New Issue was Approved Successfuly!');
                            response.redirect('/admin/frontoffice/regpatient');
                        }
                    });
                }        
            }
        );
    
};

exports.RegPatient_Disapprove = function(request, response){ 
    var id = request.params.id;
   
        Model.RegPatientModel.update(
            { _id: id }, 
            {
                status: 0,
            },
            { multi: true }, 
            function(error, result){
                if(error) {
                    console.log('Error')
                    request.flash('errorFlash', 'There was an error in Disapproving this Patient New Issue!');
                    response.redirect('/admin/frontoffice/regpatient');
                } else {
                    request.flash('successFlash', 'Patient New Issue was Diaapproved Successfully!');
                    response.redirect('/admin/frontoffice/regpatient');
                }        
            }
        );
    
};

exports.RegPatient_Add = function(request, response){
    Model.GenderModel.find({}).exec(function(error,result){
        if(error){
            request.flash('errorFlash', 'There was an error in finding Registered Patient(s) in the database');
            response.redirect('/admin/frontoffice/regpatient');
        }
        else{
            response.render('admin/frontoffice/RegPatientAdd', {title: 'Register New Patient', errorFlash: request.flash('errorFlash'), successFlash: request.flash('successFlash'), result});
        }
    });
};

exports.RegPatient_Create = function(request, response){
    var first_name = request.body.first_name;
    var middle_name = request.body.middle_name;
    var last_name = request.body.last_name;
    var email = request.body.email;
    var gender = request.body.gender;
    var patient_id = request.body.patient_id;
    var address = request.body.address;
    var phone_number = request.body.phone_number;
    var password = "patient@123";
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    if(Validation.IsNullOrEmpty([first_name,middle_name,last_name,email,patient_id,address,phone_number,gender])) {
        request.flash('errorFlash', 'Please fill out all fields');
        response.redirect('/admin/frontoffice/regpatient/add');
    } 

    else{
        var a = new Model.RegPatientModel({
            first_name:first_name,
            middle_name:middle_name,
            last_name:last_name,
            email:email,
            patient_id:patient_id,
            gender:gender,
            address:address,
            phone_number:phone_number,
            password:hash,
            status: 0
        });
        a.save(function(error, result){
            if(error){
                request.flash('errorFlash', 'There was an error adding a New Patient to the database');
                response.redirect('/admin/frontoffice/regpatient/add');
            } 
            else {
                var b = new Model.OPDModel({
                    regpatient_id:result._id,
                    status: '0'
                });
                b.save(function(error){
                    if(error){
                        request.flash('errorFlash', 'There was an error adding an OPD to the database');
                        response.render('/admin/frontoffice/regpatient/add');
                    } 
                    else{
                        request.flash('successFlash', 'New Patient was Registered Successfully');
                        response.redirect('/admin/frontoffice/regpatient');        
                    }
                });
             }
        });
    }
};

exports.RegPatient_Edit = function(request, response){
    var id = request.params.id;
    
    Model.RegPatientModel.findOne({ _id: id }, function(error, result){
        if(error) {
            console.log('Error');
            request.flash('errorFlash', 'There was an error finding a Patient in the database with this id');
            response.redirect('/admin/frontoffice/regpatient');
        }
        else {
            if(result){
                Model.GenderModel.find({}).exec(function(error2, result2){
                    if(error2) {
                        request.flash('errorFlash', 'There was an error finding an Gender in the database with this id');
                        response.redirect('/admin/frontoffice/regpatient');
                    } 
                    else {
                        response.render('admin/frontoffice/RegPatientEdit', {title: 'Edit Patient Records', result, result2, successFlash: request.flash('successFlash'), errorFlash: request.flash('errorFlash')});
                    }
                });
            }
            
        }
    });
};

exports.RegPatient_Update = function(request, response){ 
    var id = request.body.id;
    var first_name = request.body.first_name;
    var middle_name = request.body.middle_name;
    var last_name = request.body.last_name;
    var gender = request.body.gender;
    var patient_id = request.body.patient_id;
    var address = request.body.address;
    var phone_number = request.body.phone_number;
 
    if(Validation.IsNullOrEmpty([first_name,middle_name,last_name,gender,address,phone_number])) {
        request.flash('errorFlash', 'Please fill out all fields'); 
        response.redirect('/admin/frontoffice/regpatient');
    } 
    else{
        Model.RegPatientModel.update(
            { _id: id }, 
            {
                first_name:first_name,
                middle_name:middle_name,
                last_name:last_name,
                address:address,
                gender:gender,
                phone_number:phone_number
            },
            { multi: true }, 
            function(error, result){
                if(error) {
                    console.log('Error')
                    request.flash('errorFlash', 'There was an error in Updating Patient Records');
                    response.redirect('/admin/frontoffice/regpatient');
                } else {
                    request.flash('successFlash', 'Patient Record was updated successfully');
                    response.redirect('/admin/frontoffice/regpatient');
                }        
            }
        );
    }   
};

exports.RegPatient_Delete = function(request, response){ 
    var id = request.params.id;
    Model.RegPatientModel.remove({ _id: id }, function(error, result) {
        if(error) {
            console.log('Error');
            request.flash('errorFlash', 'There was an error deleting the Patient Record');
            response.redirect('/admin/frontoffice/regpatient');
        } else {
            request.flash('successFlash', 'Patient Record was deleted successfully');
            response.redirect('/admin/frontoffice/regpatient');
        }
    });
};
//End of RegPatient

//Appointment
exports.Appointment_List = function(request, response) {
    Model.AppointmentModel.find({}).populate('regpatient_id').exec(function(error,result){
        if(error){
            request.flash('errorFlash', 'There was an error in finding Registered Appointment(s) in the database');
            response.redirect('/admin/frontoffice/appointment');
        }
        else{
            Model.GenderModel.find({}).exec(function(error2,result2){
                if(error2){
                    request.flash('errorFlash', 'There was an error in finding Gender in the database');
                    response.redirect('/admin/frontoffice/appointment');
                }
                else{
                    response.render('admin/frontoffice/AppointmentList',{title: 'List of Registered Appointment(s)', successFlash: request.flash('successFlash'), errorFlash: request.flash('errorFlash'), result, result2});
                }
            });
        }
    });
};


exports.Appointment_Approve = function(request, response){ 
    var id = request.params.id;
    var RegPatientId = request.body.RegPatientId;
    var RegPatientMessage = request.body.RegPatientMessage;
    var AppointmentDate = request.body.AppointmentDate;
   
        Model.AppointmentModel.update(
            { _id: id }, 
            {
                status: 1
            },
            { multi: true }, 
            function(error, result){
                if(error) {
                    console.log('Error')
                    request.flash('errorFlash', 'There was an error in Approving this Patient Appointment!');
                    response.redirect('/admin/frontoffice/appointment');
                } 
                else {
                    request.flash('successFlash', 'Patient Appointment was Approved Successfuly!');
                    response.redirect('/admin/frontoffice/appointment');

                    // var a = new Model.DoctorModel({
                    //     regpatient_id:RegPatientId,
                    //     appointment_message:RegPatientMessage,
                    //     appointment_date:AppointmentDate,
                    //     status: 0
                    // });
                    // a.save(function(error,result){
                    //     if(error){
                    //         request.flash('errorFlash', 'There was an error adding an Appointment to the database');
                    //         response.render('/admin/frontoffice/appointment');
                    //     } 
                    //     else{
                    //         request.flash('successFlash', 'Patient Appointment was Approved Successfuly!');
                    //         response.redirect('/admin/frontoffice/appointment');
                    //     }
                    // });
                }        
            }
        );
    
};

exports.Appointment_Disapprove = function(request, response){ 
    var id = request.params.id;
   
        Model.AppointmentModel.update(
            { _id: id }, 
            {
                status: 0,
            },
            { multi: true }, 
            function(error, result){
                if(error) {
                    console.log('Error')
                    request.flash('errorFlash', 'There was an error in Disapproving this Patient Appointment!');
                    response.redirect('/admin/frontoffice/appointment');
                } else {
                    request.flash('successFlash', 'Patient Appointment was Diaapproved Successfully!');
                    response.redirect('/admin/frontoffice/appointment');
                }        
            }
        );
    
};

exports.Appointment_Add = function(request, response){
    response.render('admin/frontoffice/AppointmentAdd', {title: 'Register New Appointment', errorFlash: request.flash('errorFlash'), successFlash: request.flash('successFlash')});
};

exports.Appointment_Create = function(request, response){
    var card_no = request.body.card_no;
    var appdate = request.body.appdate;
    var message = request.body.message;

    if(Validation.IsNullOrEmpty([card_no,appdate])) {
        request.flash('errorFlash', 'Please fill out all fields');
        response.redirect('/admin/frontoffice/Appointment/add');
    } 

    else{
        Model.RegPatientModel.findOne({patient_id : card_no}).exec(function(error,result){
            if(error){
                request.flash('errorFlash', 'There was an error in finding Registered Patient(s) in the database');
                response.redirect('/admin/frontoffice/appointment');
            }
            else{
                console.log(result);
                if(result == 0){
                    request.flash('errorFlash', 'Card Number does not Exist!!!');
                    response.redirect('/admin/frontoffice/appointment/add');        
                }
                else{
                    var a = new Model.AppointmentModel({
                        regpatient_id:result._id,
                        appointment_date:appdate,
                        appointment_message:message,
                        status:2
                    });
                    a.save(function(error, result){
                        if(error){
                            request.flash('errorFlash', 'There was an error adding a New Appointment to the database');
                            response.redirect('/admin/frontoffice/appointment/add');
                        } 
                        else {
                            request.flash('successFlash', 'New Appointment was Registered Successfully');
                            response.redirect('/admin/frontoffice/appointment');        
                        }
                    });
                }
            }
        });
    }
};
//End of RegPatient