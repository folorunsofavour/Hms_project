var Validation = require('../../utilities/Validation');
var Model = require('../../models/Models');
var bcrypt = require('bcrypt-nodejs');

exports.LoginPage = async (request, response) => {
    response.render('auth/Adminlogin', {title: 'Admin Login', layout: 'ViewAuth.handlebars' , errorFlash: request.flash('errorFlash')});
};

exports.Login = async (request, response) => {
    var email = request.body.email;
    var password = request.body.password;
    console.log(email);
    
    if(Validation.IsNullOrEmpty([email, password])) {
        request.flash('errorFlash', 'Please fill out all fields');
        response.render('auth/Adminlogin', {title: 'Admin Login', layout: 'ViewAuth.handlebars', errorFlash: request.flash('errorFlash') });
    }
    else{
        await Model.AdminModel.findOne({email:email})
        .then((result) => {
            if(bcrypt.compareSync(password, result.password) == true) {
                // request.session.forumuser = null;
                // request.session.official = null;
                request.session.admin = email;
                console.log(request.session.admin);
                request.flash('successFlash', 'Logged in Successfully');
                response.redirect('/admin/dashboard');
            }else {
                request.flash('errorFlash', 'Username or password is incorrect, Please try again!!!');
                response.render('auth/Adminlogin', {title: 'Admin Login', layout: 'ViewAuth.handlebars', errorFlash: request.flash('errorFlash') });
            }
        })
        .catch((err) => {
            request.flash('errorFlash', 'Username or password is incorrect, Please try again!!!');
            response.render('auth/Adminlogin', {title: 'Admin Login', layout: 'ViewAuth.handlebars', errorFlash: request.flash('errorFlash')});

        });
    }   
};