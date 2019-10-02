// Require nextnode
// "next-nodecms": "git+https://github.com/terryarbase/nextnode.git#leeshingchak_fork",
const nextnode      = require('next-nodecms');
const constants     = require('constants');
const _             = require('lodash');
// Customized Error
require('extend-error');
// store the base path
global.__base = __dirname;
global.__appenv = process.env.APP_ENV;
global.__nodeenv = process.env.NODE_ENV;
// Configurations
const configuration = require(`${global.__base}/config`);
// cluster process
// const cluster = require('cluster');
// const processor = require('os').cpus();

const {
    dbHost,
    dbName,
    dbAuthEnable,
    dbPassword,
    port,
    cookieSecret,
    adminPath,
    appDomain,
    name,
    dbUser,
    replica,
    replicaSetName,
} = configuration;

// var dbUrl = `mongodb://${dbHost}/${dbName}`;
// if (dbAuthEnable) {
//     dbUrl = `mongodb://${dbUser}:${dbPassword}@${dbHost}/${dbName}`;
// }
let dbUrl = `mongodb://${dbHost}/${dbName}`;
if (dbAuthEnable) {
    if (replica) {
        dbUrl = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort},${dbReplicaHost}:${dbReplicaPort},${dbReplicaHost2}:${dbReplicaPort2}/${dbName}?replicaSet=${replicaSetName}`;
    } else {
        dbUrl = `mongodb://${dbUser}:${dbPassword}@${dbHost}/${dbName}`;
    }
} else if (replica) {
    dbUrl = `mongodb://${dbHost}:${dbPort},${dbReplicaHost}:${dbReplicaPort},${dbReplicaHost2}:${dbReplicaPort2}/${dbName}?replicaSet=${replicaSetName}`;
}
console.log(dbUrl);

// Advanced Models
const userAdvancedModels = require(`${global.__base}/models/user/User`);

nextnode.init({
    name,
    'brand': name,
    'mongo': dbUrl,
    'port': port,
    'back url': false,
    'headless': false,
    'front url': appDomain,
    'api version': 'v1',
    'signin logo': `/static/logo.jpg`,
    // 'sass': 'public',
    'static': `${global.__base}/static`,
    // 'favicon': `${global.__base}/static/favicon.ico`,
    'views': 'templates/views',
    'view engine': 'pug',

    // advanced user model's definations
    // 'advanced user model': userAdvancedModels,
    // 'advanced country model': countryCodeAdvancedModels,
    // advanced role model individual permission list
    'advanced role permissions': {
        // TODO
        // e.g. User: {
        //     numeric: false,
        //     options: [
        //         {
        //             label: 'View Only',
        //             value: 0,
        //         }
        //     ],
        // }
    },

    // 'adminui custom styles': `${global.__base}/static/styles/custom.less`,

    // serve for client access
    'storage path': {
        'common': {
            path: `static/uploads/common`,
            publicPath: `${appDomain}/uploads/common/`,
        },
    },

    'auto update': false,

    'support locales pack': _.values(require('next-nodecms/static/locale.json') || {}),

    'template logo access path': `${appDomain}/static/logo.jpg`,
    'template path': {
        'forgotPassword': `${global.__base}/static/templates/forgotPassword.html`,
    },

    'model path': 'models',
    'controller path': 'controllers',
    'model plugin path': 'plugins',
    'routes path': 'routes/handler',
    // for client access
    'images access path': 'static/images',
    'config access path': 'static/public',
    'upload access path': 'static/uploads',

    'image path': `${appDomain}/static/`,

    'session store': 'mongo',
    'session store options': {
        ttl: 60 * 60,
    },
    'session': true,
    'auth': true,
    'audit trail model': 'AuditTrail',
    'country model': 'CountryList',
    'rbac': 'permission',
    'admin path': adminPath,
    'nav style': {
        fontColor: '#ffffff',
        fontHover: '#ffe53d'
    },
    localization: true,
    locale: 'en',
    'cookie secret': cookieSecret,
    enhancedList: [],
    // 'customized signin': {
    //     file: `${global.__base}/client/Login/index.js`,
    //     out: 'client/Login/index.js',
    // },
    // 'customized admin': {
    //     file: `${global.__base}/client/Admin/index.js`,
    //     out: 'client/Admin/index.js',
    // },
});

/*
    ** SSL Protocol Config (Self signed Certificate)
    ** Only serve for all of Envs except Production Env
    */
if (process.env.APP_ENV !== 'production') {
    //nextnode.set('log config', true);
    // nextnode.set('ssl', true);
    // nextnode.set('ssl key', 'private/selfsigned.key');
    // nextnode.set('ssl cert', 'private/selfsigned.crt');
    // nextnode.set('ssl port', securePort);
    /*
        ** SSL & TSL Config
        */
    // disable SSL 2.0 and SSL 3.01
    nextnode.set('ssl secureOptions',
        constants.SSL_OP_NO_SSLv3 |
        constants.SSL_OP_NO_SSLv2 |
        constants.SSL_OP_NO_TLSv1 |
        constants.SSL_OP_NO_TLSv1_1
    );
    // use TSL 1.2 instead
    nextnode.set('ssl secureProtocol', 'TLSv1_2_method');
    nextnode.set('ssl ciphers', [
        'ECDHE-RSA-AES128-GCM-SHA256',
        'ECDHE-ECDSA-AES128-GCM-SHA256',
        'ECDHE-RSA-AES256-GCM-SHA384',
        'ECDHE-ECDSA-AES256-GCM-SHA384',
        'DHE-RSA-AES128-GCM-SHA256',
        'ECDHE-RSA-AES128-SHA256',
        'DHE-RSA-AES128-SHA256',
        'ECDHE-RSA-AES256-SHA384',
        'DHE-RSA-AES256-SHA384',
        'ECDHE-RSA-AES256-SHA256',
        'DHE-RSA-AES256-SHA256',
        'HIGH',
        '!aNULL',
        '!eNULL',
        '!EXPORT',
        '!DES',
        '!RC4',
        '!MD5',
        '!PSK',
        '!SRP',
        '!CAMELLIA',
    ]);
}

// Load your project's Models
nextnode.import(nextnode.get('model path'));
// Load your project's Routes
nextnode.set('routes', require(`${global.__base}/routes`));
nextnode.set('pre:dynamic', require(`${global.__base}/utils/helper/BindBodyParser`)); // this is required for audit-trail plugin; should be removed/implemented in other way.

// Configure the navigation bar in Keystone's Admin UI
nextnode.set('nav', {
    account: ['Member', 'AccountHistory'],
});


// Start Keystone to connect to your database and initialise the web server
nextnode.start({
    onHttpsServerCreated: () => {
    },
    onHttpServerCreated: () => {
    },
});
