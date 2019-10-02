const nextnode  = require('next-nodecms');
const fs        = require('fs');
const AppEnv    = require(`${global.__base }/static/types/options/appEnv`);

// Common setting for all environment
const commonSetting = {
    port: 3001,
    name: 'NextNode Content Mangement System',
    cachePrefix: 'NextNodeCache',
    systemUserName: 'System',
    cronJobTimeFormat: 'YYYY-MM-DD HH:mm:ss',

    cronJobTimeZone: 'Asia/Hong_Kong', // timezone reference: https://momentjs.com/timezone/
    imageUploadMaxSize: 5242880,
    bannerUploadMaxSize: 5242880,
    thumbnailUploadMaxSize: 2097152,
    attachmentUploadMaxSize: 524288000,   // 50MB
    trailAttachmentUploadMaxSize: 2097152,  // 2MB
    crmLockMax: 5,
    crmLockMin: 5,  // mintues to lock
    imageMineTypeAllowed: ['image/jpeg', 'image/jpg', 'image/png'],
    attachmentMineTypeAllowed: ['application/pdf'],
    cookieSecret: 'OdFT|KznqROQfMXNP8[KN>.>7Wm3tvAUp+c+8yG:d8J!Ix[iT^[Zvm*8&wc=,',
    adminPath: 'webadmin',

    newsPerPage: 10,
    dataDisplayFormat: 'DD-MM-YYYY HH:mm',
    dataDisplayFullFormat: 'DD-MM-YYY HH:mm:ss',
    pipelineDataDisplayFormat: '%d-%m-%Y %H:%M',

    forgotPasswordLength: 10,

    encryptionCipher: 'aes-256-ecb',

    // db
    replica: false,
    replicaSetName: 'rs',
};
// mongodb://root:L95CQYy1M6cm@3.0.41.189:27017/bitnami_parse"
const localhostSetting = {
    dbHost: 'localhost',
    dbName: 'NextNodeDb',
	dbLogName: 'NextNodeDblog',
    dbAuthEnable: false,
    dbUser: '[dbusername]',
    dbPassword: '[dbpassword]',
    dbPort: 27017,
    appDomain: 'http://localhost:3003',
    securePort: 3001,
    enableHttp: true,
};

const betaSetting = {
    dbHost: 'localhost',
    dbName: 'NextNodeDb',
    dbLogName: 'NextNodeDblog',
    dbAuthEnable: false,
    dbUser: '[dbusername]',
    dbPassword: '[dbpassword]',
    dbPort: 27017,
    appDomain: 'http://nextnodetest.4d.com.hk',
    securePort: 3001,
    enableHttp: true,
};

const developmentSetting = {
    dbName: 'NextNodeDb',
    dbLogName: 'NextNodeDblog',
    dbAuthEnable: false,
    dbUser: '[dbusername]',
    dbPassword: '[dbpassword]',
    replica: true,
    replicaSetName: 'rs0',
    appDomain: 'http://nextnodedev.4d.com.hk',
    securePort: 3001,
    enableHttp: true,

    dbHost: 'mongo4rs1',
    dbReplicaHost: 'mongo4rs2',
    dbReplicaHost2: 'mongo4rs3',

    dbPort: 30001,
    dbReplicaPort: 30002,
    dbReplicaPort2: 30003,
};

const productionSetting = {
    dbName: 'NextNodeDb',
    dbLogName: 'NextNodeDblog',
    dbAuthEnable: false,
    dbUser: '[dbusername]',
    dbPassword: '[dbpassword]',
    dbPort: 27017,
    replica: true,
    replicaSetName: 'rs0',
    appDomain: 'https://www.nextnode.com',
    securePort: 3001,
    enableHttp: true,

    dbHost: 'mongo4rs1',
    dbReplicaHost: 'mongo4rs2',
    dbReplicaHost2: 'mongo4rs3',

    dbPort: 30001,
    dbReplicaPort: 30002,
    dbReplicaPort2: 30003,
};


var config;
const { env: { APP_ENV } } = process;

switch (APP_ENV) {
    case AppEnv.get('development'):
        config = developmentSetting;
        break;
    case AppEnv.get('beta'):
        config = betaSetting;
        break;
    case AppEnv.get('production'):
        config = productionSetting;
        break;
    default:
        config = localhostSetting;
}
config = {
    ...commonSetting,
    ...config,
};

module.exports = config;
