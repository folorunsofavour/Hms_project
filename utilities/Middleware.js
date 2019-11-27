exports.MyNotifications = function(request, response, next) {
     
    response.pageInfo = {};
    response.pageInfo.notifications = {};
    response.pageInfo.notifications.message = '';
 
    if(request.param('message')) {
        response.pageInfo.notifications.message = request.param('message'); 
    }
 
    if(request.param('success')) {
        response.pageInfo.notifications.success = "Success!"
    }
    else if (request.param('error')){
        response.pageInfo.notifications.error = "Error!"
    }
     
    next();
     
};

exports.IsAuthenticated = function(request, response, next){
    if(request.session.admin){
        next();
    }
    else{
        request.flash('errorFlash','Login to continue');
        response.redirect('/auth/admin-login');
    }
};
// exports.IsAuthenticatedOfficial = function(request, response, next){
//     if(request.session.official){
//         next();
//     }else{
//         request.flash('errorFlash', 'Login to continue');
//         response.redirect('/auth/official-login');
//     }
// };

// exports.IsAuthenticatedForumUser = function(request, response, next){
//     if(request.session.forumuser){
//         next();
//     }else{
//         request.flash('errorFlash', 'Login to continue');
//         response.redirect('/auth/forumuser-login');
//     }
// };
