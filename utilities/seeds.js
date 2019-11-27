var Validation = require('../utilities/Validation');
var Model = require('../models/Models');
var bcrypt = require('bcrypt-nodejs');

var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("admin@123", salt);

var a = {
    email: "admin@hmsproject.com",
    password : hash
};

Model.AdminModel.create(a , function(error, result){
    if(error)
    concole.log("error");
});

