var AdminLoginController = require('./controllers/Auth/AdminLoginController');
var Middleware = require('./utilities/Middleware');
var AdminController = require('./controllers/admin/AdminController');
var FrontOfficeController = require('./controllers/admin/FrontOfficeController');
var GenderController = require('./controllers/admin/GenderController');
var WelcomeController = require('./controllers/WelcomeController');
var OPDController = require('./controllers/admin/OPDController');
var BloodGroupController = require('./controllers/admin/BloodGroupController');
var PayModeController = require('./controllers/admin/PayModeController');
var ConsultDoctorController = require('./controllers/admin/ConsultDoctorController');
var DepartmentController = require('./controllers/admin/DepartmentController');
var PaymentFeeController = require('./controllers/admin/PaymentFeeController');
var PathologyController = require('./controllers/admin/PathologyController');
var TestFeeController = require('./controllers/admin/TestFeeController');
var TestNameController = require('./controllers/admin/TestNameController');
var RadiologyController = require('./controllers/admin/RadiologyController');
var RaidTestFeeController = require('./controllers/admin/RaidTestFeeController');
var RaidTestNameController = require('./controllers/admin/RaidTestNameController');
var PharmacyController = require('./controllers/admin/PharmacyController');
var MedNameController = require('./controllers/admin/MedNameController');
var MedCategoryController = require('./controllers/admin/MedCategoryController');

module.exports = function (route) {
// Auth Routes
route.get('/auth/admin-login', AdminLoginController.LoginPage);
route.post('/auth/admin-login', AdminLoginController.Login);

//Admin Routes
route.get('/admin/dashboard',  Middleware.IsAuthenticated, AdminController.Dashboard);

//Front Office

//regpatient
route.get('/admin/frontoffice/regpatient',  Middleware.IsAuthenticated, FrontOfficeController.RegPatient_List);
route.get('/admin/frontoffice/regpatient/add', Middleware.IsAuthenticated, FrontOfficeController.RegPatient_Add);
route.post('/admin/frontoffice/regpatient/add', Middleware.IsAuthenticated, FrontOfficeController.RegPatient_Create);
route.get('/admin/frontoffice/regpatient/edit/:id', Middleware.IsAuthenticated, FrontOfficeController.RegPatient_Edit);
route.post('/admin/frontoffice/regpatient/edit', Middleware.IsAuthenticated, FrontOfficeController.RegPatient_Update);
route.get('/admin/frontoffice/regpatient/delete/:id', Middleware.IsAuthenticated, FrontOfficeController.RegPatient_Delete);
route.get('/admin/frontoffice/regpatient/approve/:id', Middleware.IsAuthenticated, FrontOfficeController.RegPatient_Approve);
route.get('/admin/frontoffice/regpatient/disapprove/:id', Middleware.IsAuthenticated, FrontOfficeController.RegPatient_Disapprove);
//repatient

//appointment
route.get('/admin/frontoffice/appointment',  Middleware.IsAuthenticated, FrontOfficeController.Appointment_List);
route.get('/admin/frontoffice/appointment/add', Middleware.IsAuthenticated, FrontOfficeController.Appointment_Add);
route.post('/admin/frontoffice/appointment/add', Middleware.IsAuthenticated, FrontOfficeController.Appointment_Create);
route.get('/admin/frontoffice/appointment/approve/:id', Middleware.IsAuthenticated, FrontOfficeController.Appointment_Approve);
route.get('/admin/frontoffice/appointment/disapprove/:id', Middleware.IsAuthenticated, FrontOfficeController.Appointment_Disapprove);
//End of appointment

//End of Front Office

//Setup
//gender
route.get('/admin/setup/gender',  Middleware.IsAuthenticated, GenderController.Gender_List);
route.get('/admin/setup/gender/add', Middleware.IsAuthenticated, GenderController.Gender_Add);
route.post('/admin/setup/gender/add', Middleware.IsAuthenticated, GenderController.Gender_Create);
route.get('/admin/setup/gender/edit/:id', Middleware.IsAuthenticated, GenderController.Gender_Edit);
route.post('/admin/setup/gender/edit', Middleware.IsAuthenticated, GenderController.Gender_Update);
//gender
//blood group
route.get('/admin/setup/bloodgroup',  Middleware.IsAuthenticated, BloodGroupController.BloodGroup_List);
route.get('/admin/setup/bloodgroup/add', Middleware.IsAuthenticated, BloodGroupController.BloodGroup_Add);
route.post('/admin/setup/bloodgroup/add', Middleware.IsAuthenticated, BloodGroupController.BloodGroup_Create);
route.get('/admin/setup/bloodgroup/edit/:id', Middleware.IsAuthenticated, BloodGroupController.BloodGroup_Edit);
route.post('/admin/setup/bloodgroup/edit', Middleware.IsAuthenticated, BloodGroupController.BloodGroup_Update);
//end of blood group
//payment mode
route.get('/admin/setup/paymode',  Middleware.IsAuthenticated, PayModeController.PayMode_List);
route.get('/admin/setup/paymode/add', Middleware.IsAuthenticated, PayModeController.PayMode_Add);
route.post('/admin/setup/paymode/add', Middleware.IsAuthenticated, PayModeController.PayMode_Create);
route.get('/admin/setup/paymode/edit/:id', Middleware.IsAuthenticated, PayModeController.PayMode_Edit);
route.post('/admin/setup/paymode/edit', Middleware.IsAuthenticated, PayModeController.PayMode_Update);
//end of payment
//department
route.get('/admin/setup/dept',  Middleware.IsAuthenticated, DepartmentController.Department_List);
route.get('/admin/setup/dept/add', Middleware.IsAuthenticated, DepartmentController.Department_Add);
route.post('/admin/setup/dept/add', Middleware.IsAuthenticated, DepartmentController.Department_Create);
route.get('/admin/setup/dept/edit/:id', Middleware.IsAuthenticated, DepartmentController.Department_Edit);
route.post('/admin/setup/dept/edit', Middleware.IsAuthenticated, DepartmentController.Department_Update);
//end of department
//payment fee
route.get('/admin/setup/payfee',  Middleware.IsAuthenticated, PaymentFeeController.PaymentFee_List);
route.get('/admin/setup/payfee/add', Middleware.IsAuthenticated, PaymentFeeController.PaymentFee_Add);
route.post('/admin/setup/payfee/add', Middleware.IsAuthenticated, PaymentFeeController.PaymentFee_Create);
route.get('/admin/setup/payfee/edit/:id', Middleware.IsAuthenticated, PaymentFeeController.PaymentFee_Edit);
route.post('/admin/setup/payfee/edit', Middleware.IsAuthenticated, PaymentFeeController.PaymentFee_Update);
//end of payment fee

//testname
route.get('/admin/setup/testname',  Middleware.IsAuthenticated, TestNameController.TestName_List);
route.get('/admin/setup/testname/add', Middleware.IsAuthenticated, TestNameController.TestName_Add);
route.post('/admin/setup/testname/add', Middleware.IsAuthenticated, TestNameController.TestName_Create);
route.get('/admin/setup/testname/edit/:id', Middleware.IsAuthenticated, TestNameController.TestName_Edit);
route.post('/admin/setup/testname/edit', Middleware.IsAuthenticated, TestNameController.TestName_Update);
//end of testname
//test fee
route.get('/admin/setup/testfee',  Middleware.IsAuthenticated, TestFeeController.TestFee_List);
route.get('/admin/setup/testfee/add', Middleware.IsAuthenticated, TestFeeController.TestFee_Add);
route.post('/admin/setup/testfee/add', Middleware.IsAuthenticated, TestFeeController.TestFee_Create);
route.get('/admin/setup/testfee/edit/:id', Middleware.IsAuthenticated, TestFeeController.TestFee_Edit);
route.post('/admin/setup/testfee/edit', Middleware.IsAuthenticated, TestFeeController.TestFee_Update);
//end of test fee

//raidtestname
route.get('/admin/setup/raid/testname',  Middleware.IsAuthenticated, RaidTestNameController.RaidTestName_List);
route.get('/admin/setup/raid/testname/add', Middleware.IsAuthenticated, RaidTestNameController.RaidTestName_Add);
route.post('/admin/setup/raid/testname/add', Middleware.IsAuthenticated, RaidTestNameController.RaidTestName_Create);
route.get('/admin/setup/raid/testname/edit/:id', Middleware.IsAuthenticated, RaidTestNameController.RaidTestName_Edit);
route.post('/admin/setup/raid/testname/edit', Middleware.IsAuthenticated, RaidTestNameController.RaidTestName_Update);
//end of raidtestname
//raidtest fee
route.get('/admin/setup/raid/testfee',  Middleware.IsAuthenticated, RaidTestFeeController.RaidTestFee_List);
route.get('/admin/setup/raid/testfee/add', Middleware.IsAuthenticated, RaidTestFeeController.RaidTestFee_Add);
route.post('/admin/setup/raid/testfee/add', Middleware.IsAuthenticated, RaidTestFeeController.RaidTestFee_Create);
route.get('/admin/setup/raid/testfee/edit/:id', Middleware.IsAuthenticated, RaidTestFeeController.RaidTestFee_Edit);
route.post('/admin/setup/raid/testfee/edit', Middleware.IsAuthenticated, RaidTestFeeController.RaidTestFee_Update);
//end of raidtest fee

//medicine
route.get('/admin/setup/phar/medname',  Middleware.IsAuthenticated, MedNameController.MedName_List);
route.get('/admin/setup/phar/medname/add', Middleware.IsAuthenticated, MedNameController.MedName_Add);
route.post('/admin/setup/phar/medname/add', Middleware.IsAuthenticated, MedNameController.MedName_Create);
route.get('/admin/setup/phar/medname/edit/:id', Middleware.IsAuthenticated, MedNameController.MedName_Edit);
route.post('/admin/setup/phar/medname/edit', Middleware.IsAuthenticated, MedNameController.MedName_Update);
//end of medicine
//medicine category
route.get('/admin/setup/phar/medcategory',  Middleware.IsAuthenticated, MedCategoryController.MedCategory_List);
route.get('/admin/setup/phar/medcategory/add', Middleware.IsAuthenticated, MedCategoryController.MedCategory_Add);
route.post('/admin/setup/phar/medcategory/add', Middleware.IsAuthenticated, MedCategoryController.MedCategory_Create);
route.get('/admin/setup/phar/medcategory/edit/:id', Middleware.IsAuthenticated, MedCategoryController.MedCategory_Edit);
route.post('/admin/setup/phar/medcategory/edit', Middleware.IsAuthenticated, MedCategoryController.MedCategory_Update);
//end of medicine category

//End of Setup

//OPD
route.get('/admin/opd',  Middleware.IsAuthenticated, OPDController.OPD_List);
route.post('/admin/opd/regdetails',  Middleware.IsAuthenticated, OPDController.OPD_RegDetails);

//End of OPD

//ConsultDoctor
route.get('/admin/consultdoctor',  Middleware.IsAuthenticated, ConsultDoctorController.ConsultDoctor_List);
route.post('/admin/consultdoctor/regdetails',  Middleware.IsAuthenticated, ConsultDoctorController.ConsultDoctor_RegDetails);
//End of ConsultDoctor

//Pathology
route.get('/admin/path',  Middleware.IsAuthenticated, PathologyController.Pathology_List);
route.post('/admin/path/regdetails',  Middleware.IsAuthenticated, PathologyController.Pathology_RegDetails);
//End of Pathology

//Radiology
route.get('/admin/raid',  Middleware.IsAuthenticated, RadiologyController.Radiology_List);
route.post('/admin/raid/regdetails',  Middleware.IsAuthenticated, RadiologyController.Radiology_RegDetails);
//End of Radiology

//Pharmacy
route.get('/admin/phar',  Middleware.IsAuthenticated, PharmacyController.Pharmacy_List);
route.post('/admin/phar/regdetails',  Middleware.IsAuthenticated, PharmacyController.Pharmacy_RegDetails);
//End of Pharmacy

//End of Admin Routes
//Frontend Routes
route.get('/', WelcomeController.Index);
}