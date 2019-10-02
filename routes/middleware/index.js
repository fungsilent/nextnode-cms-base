/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
const nextnode                  = require('next-nodecms');
const fs                        = require('fs');
const doMap                     = require('lodash/map');

const authHeader                = require('auth-header');
const moment                    = require('moment');
// const toKeys                    = require('lodash/keys');
// Project Files
const CommonHandler             = require(`${global.__base}/routes/lib/CommonHandler`);
const MemberController          = require(`${global.__base}/${nextnode.get('model path')}/user/Member`);
// const AppConfigController       = require(`${global.__base}/${nextnode.get('model path')}/system/AppConfig`);
// Mandataries
const {
    Types:{
        ObjectId,
    },
} = nextnode.mongoose;
// Configs
const {
    getElecticValue,
} = require(`${global.__base}/utils/helper`);

const errorTypes    = {
    mustSignin: 'singinRequired',
    missingBearer: 'invalidAuthorizationSchema',
    noMember: 'noSuchMember',
    configFailed: 'cannotGetSystemConfig',
    freezeMember:      'disabledMemberAccount',
    inactivedMember:   'inactivatedMemberAccount',
    noProduct:  'productNotFound',
}

exports.initialRequest = (req, res, next) => {
    // web
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
}

exports.requireLanguage = (req, res, next) => {
    
    req.language = req.headers.language || req.query.language || req.body.language || nextnode.get('locale');
    next();
}

/*
** capture the authorization header from loginToken
** all of api can have authorization header after login no matter it is public api route
** @param3: required
** Terry Chan
** 15/12/2018
*/
const catchAuthorization = async (req, res, next) => {
    // obtain at least one language;
    req.language = req.headers.language || req.query.language || req.body.language || nextnode.get('locale');
    // req.language = 'zhtw';
    const commonHandler = new CommonHandler();
    let authorization = {};
    try {
        // use get query to pass the authorization token
        // just for the case of read book from the urlencode
        // decodeURIComponent used to settle the spacing between the token and Bearar prefix
        authorization = req.get('authorization') || 
            (req.query.appToken ? decodeURIComponent(req.query.appToken) : null);
        authorization = authHeader.parse(authorization);
    } catch (err) {
        // ingore whether the bearer is provided
    }
    if (authorization && authorization.scheme === 'Bearer' && authorization.token) {
        const currentMember = await MemberController.getMemberByAppToken(authorization.token);
        // if (!currentMember) {
        //     return commonHandler.multiResErr(res, req.language, errorTypes.noMember, null, 403);
        // }
    
        // construct the tokenInfo and member
        // don't use spread for Document Object
        if (currentMember) {
            // if (!currentMember.activate) {
            //     return commonHandler.multiResErr(res, req.language, errorTypes.inactivedMember, null, 403);
            // }
            if (!currentMember.accountStatus) {
                return commonHandler.multiResErr(res, req.language, errorTypes.freezeMember, null, 403);
            }
            
            req.member = currentMember;
            // object spread
            req.tokenInfo = {
                id: currentMember._id,
                memberOId: ObjectId(currentMember._id),
                fullname: currentMember.fullname,
                deviceId: currentMember.deviceId,
                lang: currentMember.language,
                deviceType: currentMember.deviceType,
                loginToken: currentMember.loginToken,
            };

            // use user preference instead
            req.language = currentMember.language;
        }
    }
    next();
}
// /**
// 	Initialises the standard view locals

// 	The included layout depends on the navLinks array to generate
// 	the navigation in the header, you may wish to change this array
// 	or replace it with your own templates / logic.
// */
exports.initLocals = (req, res, next) => catchAuthorization(req, res, next);
    // use public language initial the routes
//     req.language = req.headers.language || req.query.language || req.body.language || nextnode.get('locale');
// };

// /*
// ** config the 
// ** 
// */
exports.initConfig = async (req, res, next) => {
    var AppConfig = null;
    const commonHandler = new CommonHandler();
    const { language } = req;
    const AppConfigList = [];
    // AppConfigController.list;
    // 1.0 get from static file
    try {
        // const appConfigGenerator = require(`${global.__base}/${nextnode.get('model path')}/lib/plugin/AppConfig/generator`);
        // AppConfig = require(`${appConfigGenerator.getStaticPath()}?t=${Math.random()}`);
        // AppConfig = JSON.parse(fs.readFileSync(appConfigGenerator.getStaticPath()));
    } catch (err) {
        console.log('> [Middleware.initConfig]: ', err);
    }
    try {
        // 1.1 worst case, query from db if not found the static file
        // if (!AppConfig) {
        //     AppConfig = await AppConfigController.getConfig();
        //     // trigger save the static file hook again
        //     AppConfig.set('updatedAt', moment().toDate());
        //     AppConfig.save();
        //     AppConfig = AppConfig.toObject();
        // }
    } catch (err) {
        console.log('> [Middleware.initConfig]: ', err);
        return commonHandler.multiResErr(res, language, errorTypes.configFailed, null, 500);
        // return commonHandler.appResErr(res, err, 500, err.message || 'Database Operation Error', 500);
    }
    
    // 2.0 get from Utility, convert to current language value
    req.config = getElecticValue(language, AppConfig, AppConfigList);
    // 3.0 get static options list for client
    req.config.districtList = doMap(nextnode.Options.region.hk.values, value => ({
        ...value,
        ...{
            label: value.label[language],
        }
    }));
    // 4.0 get appellation
    req.config.appellationList = doMap(nextnode.Options.appellation.values, value => ({
        ...value,
        ...{
            label: value.label[language],
        }
    }));
    // 5.0 get dvice list
    req.config.deviceList = doMap(nextnode.Options.device.values, value => ({
        ...value,
        ...{
            label: value.label[language],
        }
    }));
    // 6.0 get supported language pack
    req.config.languageList = nextnode.get('support locales pack');
    // console.log(AppConfig);
    next();
};


exports.requiredMember = (req, res, next) => {
    const commonHandler = new CommonHandler();
    // const defaultLang = nextnode.get('locale') || 'en';
    if (!req.member || !req.tokenInfo) {
        return commonHandler.multiResErr(res, req.language, errorTypes.mustSignin, null, 403);
    }

    next();
};


