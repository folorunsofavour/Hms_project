var config = require('../config');
var mongoose = require('mongoose');
var paginate = require('mongoose-paginate');
var connectionString = 'mongodb://' + config[config.environment].database.credentials + config[config.environment].database.host + ':' + config[config.environment].database.port  + '/'+ config[config.environment].database.name;
var db = mongoose.connection;


mongoose.connect(connectionString);

db.on('error', function() {
    console.log('There was an error connecting to the database');
});

db.once('open', function() {
    console.log('Successfully connected to database');
});

mongoose.connect(connectionString); //connecting to mongoDB

var Admin = new mongoose.Schema({
    email: String,
    password: String,
    first_name: String,
    middle_name: String,
    last_name: String,
    address: String,
    phone_number: String,
    medical_license: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

var RegPatient = new mongoose.Schema({
    first_name: String,
    middle_name: String,
    last_name: String,
    gender: {type: mongoose.Schema.Types.ObjectId, ref: 'Gender' },
    patient_id: String,
    address: String,
    phone_number: String,
    email: String,
    status: String,
    password: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

var OPD = new mongoose.Schema({
    regpatient_id: {type: mongoose.Schema.Types.ObjectId, ref: 'RegPatient' },
    age: String,
    blood_group: {type: mongoose.Schema.Types.ObjectId, ref: 'BloodGroup' },
    weight: String,
    height: String,
    blood_pressure: String,
    note: String,
    amount: {type: mongoose.Schema.Types.ObjectId, ref: 'PaymentFee' },
    payment_mode: {type: mongoose.Schema.Types.ObjectId, ref: 'PaymentMode' },
    status: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

var Appointment = new mongoose.Schema({
    regpatient_id: {type: mongoose.Schema.Types.ObjectId, ref: 'RegPatient' },
    appointment_date: String,
    appointment_message: String,
    status: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

var ConsultDoctor = new mongoose.Schema({
    opd_id: {type: mongoose.Schema.Types.ObjectId, ref: 'OPD' },
    status: String,
    symptom: String,
    allergy: String,
    doctor_note: String,
    department_id:  {type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    payment_fee: {type: mongoose.Schema.Types.ObjectId, ref: 'PaymentFee' },
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

var Pathology = new mongoose.Schema({
    consultdoctor_id: {type: mongoose.Schema.Types.ObjectId, ref: 'ConsultDoctor' },
    status: String,
    test_name: {type: mongoose.Schema.Types.ObjectId, ref: 'TestName' },
    test_type: String,
    report_days: String,
    department_id:  {type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    method: String,
    code: String,
    test_charges:  {type: mongoose.Schema.Types.ObjectId, ref: 'TestFee' },
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

var Radiology = new mongoose.Schema({
    consultdoctor_id: {type: mongoose.Schema.Types.ObjectId, ref: 'ConsultDoctor' },
    status: String,
    test_name: {type: mongoose.Schema.Types.ObjectId, ref: 'RaidTestName' },
    test_type: String,
    report_days: String,
    department_id:  {type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    code: String,
    test_charges:  {type: mongoose.Schema.Types.ObjectId, ref: 'RaidTestFee' },
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

var Pharmacy = new mongoose.Schema({
    consultdoctor_id: {type: mongoose.Schema.Types.ObjectId, ref: 'ConsultDoctor' },
    status: String,
    medname_id: {type: mongoose.Schema.Types.ObjectId, ref: 'MedName' },
    expirydate: String,
    quantity: String,
    amount: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

var BloodBank = new mongoose.Schema({
    consultdoctor_id: {type: mongoose.Schema.Types.ObjectId, ref: 'ConsultDoctor' },
    status: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

var OpTheatre = new mongoose.Schema({
    consultdoctor_id: {type: mongoose.Schema.Types.ObjectId, ref: 'ConsultDoctor' },
    status: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});
var Gender = new mongoose.Schema({
    name: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

var BloodGroup = new mongoose.Schema({
    name: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

var PayMode = new mongoose.Schema({
    name: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

var Department = new mongoose.Schema({
    name: String,
    category: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

var PaymentFee = new mongoose.Schema({
    department_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    amount: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

var TestName = new mongoose.Schema({
    name: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

var TestFee = new mongoose.Schema({
    testname_id: {type: mongoose.Schema.Types.ObjectId, ref: 'TestName' },
    amount: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

var RaidTestName = new mongoose.Schema({
    name: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

var RaidTestFee = new mongoose.Schema({
    raidtestname_id: {type: mongoose.Schema.Types.ObjectId, ref: 'RaidTestName' },
    amount: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

var MedName = new mongoose.Schema({
    medcategory_id: {type: mongoose.Schema.Types.ObjectId, ref: 'MedCategory' },
    name: String,
    sales_price: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

var MedCategory = new mongoose.Schema({
    name: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

var AdminModel = mongoose.model('Admin', Admin);
var RegPatientModel = mongoose.model('RegPatient', RegPatient);
var GenderModel = mongoose.model('Gender', Gender);
var OPDModel = mongoose.model('OPD', OPD);
var BloodGroupModel = mongoose.model('BloodGroup', BloodGroup);
var PayModeModel = mongoose.model('PayMode', PayMode);
var AppointmentModel = mongoose.model('Appointment', Appointment);
var ConsultDoctorModel = mongoose.model('ConsultDoctor', ConsultDoctor);
var DepartmentModel = mongoose.model('Department', Department);
var PaymentFeeModel = mongoose.model('PaymentFee', PaymentFee);
var TestNameModel = mongoose.model('TestName', TestName);
var TestFeeModel = mongoose.model('TestFee', TestFee);
var RaidTestNameModel = mongoose.model('RaidTestName', RaidTestName);
var RaidTestFeeModel = mongoose.model('RaidTestFee', RaidTestFee);
var PathologyModel = mongoose.model('Pathology', Pathology);
var RadiologyModel = mongoose.model('Radiology', Radiology);
var PharmacyModel = mongoose.model('Pharmacy', Pharmacy);
var OpTheatreModel = mongoose.model('OpTheatre', OpTheatre);
var BloodBankModel = mongoose.model('BloodBank', BloodBank);
var MedNameModel = mongoose.model('MedName', MedName);
var MedCategoryModel = mongoose.model('MedCategory', MedCategory);

module.exports = {
    AdminModel: AdminModel,
    RegPatientModel: RegPatientModel,
    GenderModel: GenderModel,
    OPDModel: OPDModel,
    BloodGroupModel: BloodGroupModel,
    PayModeModel: PayModeModel,
    AppointmentModel: AppointmentModel,
    ConsultDoctorModel: ConsultDoctorModel,
    DepartmentModel: DepartmentModel,
    PaymentFeeModel: PaymentFeeModel,
    TestNameModel: TestNameModel,
    TestFeeModel: TestFeeModel,
    RaidTestNameModel: RaidTestNameModel,
    RaidTestFeeModel: RaidTestFeeModel,
    PathologyModel: PathologyModel,
    RadiologyModel: RadiologyModel,
    PharmacyModel: PharmacyModel,
    OpTheatreModel: OpTheatreModel,
    BloodBankModel: BloodBankModel,
    MedNameModel: MedNameModel,
    MedCategoryModel: MedCategoryModel
};