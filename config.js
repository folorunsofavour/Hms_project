var config = {};
 
config.development = {
     
    database: {
        name: 'hmsproject',
        host: 'localhost',
        port: '27017',
        credentials: '' // username:password@
    },
    smtp: {
        username: "username",
        password: "password",
        host: "smtp.gmail.com",
        port: 587,
        ssl: false
    },
    application: {
        port: 1339,
        cookieKey: '8YQM5GUAtLAT34'
    },
    ipaddress: {
        host: '192.168.43.87'
    }
     
};
 
config.production = {
     
    database: {
        name: 'mvc-express',
        host: 'localhost',
        port: '8080',
        credentials: 'admin:password@' // username:password@
    },
    smtp: {
        username: "username",
        password: "password",
        host: "smtp.yourmailserver.com",
        port: 25,
        ssl: false
    },    
    application: {
        port: 80,
        cookieKey: '5SCjWfsTW8ySul'
    }    
     
};
 
config.environment = 'development';

 
module.exports = config;