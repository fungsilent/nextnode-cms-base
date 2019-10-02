const nextnode      			= require('next-nodecms');
const moment                    = require('moment');
const doEach      				= require('lodash/forEach');
const toLower                   = require('lodash/toLower');
const doPick					= require('lodash/pick');
const doFindIndex				= require('lodash/findIndex');
const toKeys					= require('lodash/keys');
const doOwn						= require('lodash/forOwn');
const toReplace         		= require('lodash/replace');
const fs                		= require('fs');
// Project Files
const CommonHandler 			= require(`${global.__base}/routes/lib/CommonHandler`);
const { 
	generateToken,  
	validateToken,
}								= require(`${global.__base}/routes/lib/Authentication`);
// Model Controlleres
const MemberController      	= require(`${global.__base}/${nextnode.get('model path')}/user/Member`);
const AccountLogController      = require(`${global.__base}/${nextnode.get('model path')}/user/AccountHistory`);
// Handler

const {
    Types:{
        ObjectId,
    },
} = nextnode.mongoose;

// Configs
const {
	appDomain,
    forgotPasswordLength,
    dataDisplayFullFormat,
} = require(`${global.__base}/config`);
// helpers
// const {
//     randomCharset,
// } = require(`${global.__base}/utils/helper`);
// const {
//     sendMail,
//     prepareForgotPasswordTemplate,
//     prepareEmailAuthTemplate,
// } = require(`${global.__base}/utils/lib/email`);
// Mandataries
const errorTypes = {
	emptyEmailOrUser:  'invalidEmailOrUsername',
	usernameRepeat:    'duplicatedUsername',
    noUser:            'noSuchMemberExisting',
	emailRepeat:       'duplicatedEmail',
	invalidFields:     'invalidParamFields',
	validation:        'validationError',
	singinFailed:      'loginAccountFailed',
	freezeMember:      'disabledMemberAccount',
	inactivedMember:   'inactivatedMemberAccount',
    updateInfo:        'invalidUpdateInfo',
    noForgotTemplate:  'noSuchEmailForgotTemplate',
    forgotFail:        'forgotPasswordFailure',
};

class MemberHandler extends CommonHandler {

    constructor() {
    	super();
    	this.list = nextnode.list('Member');
    	this.model = this.list.model;
    	this.controller = MemberController;
        this.logController = AccountLogController;
    	// this.defaultLang = nextnode.get('locale');
    	// used for jwt token or any response to client
    	this.secretMemberInfo = ['_id', 'fullname', 'email', 'phone', 'language', 'deviceId', 'gender', 'notification', 'title'];
    	// main control flow self binding
    	// const funcs = ['signup', 'signin', 'signout', 'updateInfo', 'accountStatus','forgotPassword','emailAuth'];
        const funcs = ['signin', 'signout', 'updateInfo', 'accountStatus'];
    	doEach(funcs, func => this[func] = this[func].bind(this));
    }

    getUnqiueUserInfoQuery({ email, username }) {
    	return [
    		this.controller.getMemberByEmail(email),
    		// this.controller.getMemberByUsername(username),
    	];
    }

    async validateSignin(req) {
    	const fields = ['phone', 'password', 'country'];
    	var data = doPick(req.body, fields);
        data = {
            ...data,
            country: ObjectId(req.body.country),
        };
    	try {
    		const existingMember = await this.controller.authorised(data);

    		return {
    			existingMember,
    		}
    	} catch (err) {
    		return {
    			err,
    		};
    	}
    }

    // async validateSignup(req, res) {
    // 	const fields = [
    //         'firstname',
    //         'lastname',
    //         'email',
    //         'username',
    //         'password',
    //         'password_confirm', 
    //         'deviceId',
    //         'deviceType',
    //         'language',
    //         'gender',
    //         'notification',
    //     ];
    // 	var data = doPick(req.body, fields);
    // 	if (!data.email) {
    // 		this.multiResErr(res, req.language, errorTypes.emptyEmailOrUser, null, 406);
    // 		return null;
    // 	}
    //     data = {
    //         ...data,
    //         email: toLower(data.email),
    //     };
    // 	const existingMember = await Promise.all(this.getUnqiueUserInfoQuery(data));
    // 	if (existingMember) {
    // 		if (existingMember[0]) {
    // 			this.multiResErr(res, req.language, errorTypes.emailRepeat, null, 406);
    // 			return null;
    // 		} 
    //   //       else if (existingMember[1]) {
    // 		// 	this.multiResErr(res, req.language, errorTypes.usernameRepeat, null, 406);
    // 		// 	return null;
    // 		// }
    // 	}
    // 	data = {
    // 		...data,
    // 		...{
	   //  		fullname: {
	   //  			first: data.firstname,
	   //  			last: data.lastname,
	   //  		},
    //             notification: !!data.notification,
	   //  	},
    // 	}
    // 	return data;
    // }

    /*
    ** Main Control flow for sending email with password request
    ** Terry Chan
    */
    // async forgotPassword(req, res) {
    //     let currentMember = null;
    //     let contactUs = null;
    //     let error = null;
    //     // 1.0 find the existing member first
    //     try {
    //         currentMember = await this.controller.getMemberFromUsernameOrEmail(req.body.username);
    //     } catch (err) {
    //         error = err;
    //     }

    //     try {
    //         contactUs = await ContactUsHandler.getContactData(req, res);
    //     } catch (err) {
    //         return this.appResErr(res, err, 500, err.message || 'Database Operation Error', 500);
    //     }

    //     if (error || !currentMember) {
    //         return this.multiResErr(res, req.language, errorTypes.noUser, null, 404);
    //     }

    //     // 2.0 read the email template from static html file
    //     const newTempPassword = randomCharset(forgotPasswordLength);
    //     const emailOptions = prepareForgotPasswordTemplate(
    //         req.language,
    //         newTempPassword,
    //         currentMember,
    //         contactUs,
    //     );

    //     if (!emailOptions) {
    //         return this.multiResErr(res, req.language, errorTypes.noForgotTemplate, null, 404);
    //     }

    //     // 3.0 send out the email with the temp password to member email
    //     try {
    //         await sendMail(emailOptions);

    //     } catch (err) {
    //         return this.multiResErr(res, req.language, err, null, 500);
    //     }

    //     // 4.0 update the member password
    //     try {
    //         const updateMember = currentMember.toObject();
    //         delete updateMember.password;
    //         delete updateMember.password_confirm;
    //         var member = await this.controller.update(req, currentMember, {
    //             ...updateMember,
    //             password_confirm: newTempPassword,
    //             password: newTempPassword,
    //         });
    //     } catch (error) {
    //         // use the nextnode validation error handle instead
    //         return this.multiResErr(res, req.language, errorTypes.forgotFail, null, 500);
    //     }

    //     return this.appResAns(res, {
    //         email: currentMember.email,
    //         sent: moment().format(dataDisplayFullFormat),
    //     });
    // }

    /*
    ** Main Control flow for update member profile
    ** no matter update language preferences only or update push notification
    ** Terry Chan
    */
    async updateInfo(req, res) {
        // pickup the data to be update
        const fields = [
            'deviceId',
            'deviceType',
            'language',
            'gender',
            'title',
            'notification',
            'password',
            'password_confirm',
        ];
        var data = doPick(req.body, fields);
        var currentMember = req.member;
        if (req.body.firstname) {
            data = {
                ...data,
                ...{
                    fullname: {
                        ...data.fullname,
                        ...{
                            first: req.body.firstname,
                        }
                    }
                }
            }
        }
        if (req.body.lastname) {
            data = {
                ...data,
                ...{
                    fullname: {
                        ...data.fullname,
                        ...{
                            last: req.body.lastname,
                        }
                    }
                }
            }
        }
        if (req.body.password || req.body.password_confirm || req.body.password_old) {
            try {
                const password_error =await this.controller.checkExistingPassword(currentMember, req.body.password_old);
                if(password_error){
                    throw new Error(password_error);
                }
                if (req.body.password != req.body.password_confirm) {
                    throw new Error('Your password and confirmation password do not match.');
                }
            } catch (err) {
                return this.appResErr(res, err, 406, err.message || err, 406);
            }
        }
        const member = currentMember.toObject();
        delete member.password;
        // 2.0 update the info from any field is picked from the req.body
        const error = await this.controller.update(req, currentMember, {
            ...member,
            ...data,
        });
        // this.list.updateItem(currentMember, data, {}, err => {
        if (error) {
            // use the nextnode validation error handle instead
            return this.responseErrorFromNextNode(req, res, this.list, error);
        }
            // finally
        return this.appResAns(res, doPick(currentMember, this.secretMemberInfo));
        // }); 
    }
	/*
    ** Main Control flow for logout member account
    ** Terry Chan
    */
    async signout(req, res) {
    	// console.log(req.tokenInfo, req.member);
    	// 1.0 log the log activity
    	var loginActivityLog = null;
    	try {
    		const isLogout = true;
    		loginActivityLog = await this.logController.logging(req.member, 'logout');
    	} catch (err) {
    		console.log('> [MemberHandler]: ', err);
    		return this.appResErr(res, err, 500, err.message || 'Database Operation Error', 500);
    	}
    	// 3.0 reset login token to the member account
    	req.member.set('loginToken', null);
    	req.member.save();

    	// finally
    	this.appResAns(res, {});
    }

    /*
    ** Main Control flow for the member account status
    ** Terry Chan
    */
    async accountStatus(req, res) {
        // 1.0 after action for login successful
        let memberInfo = doPick(req.member, this.secretMemberInfo);

        // 2.0 login activity logging for the member account
        var loginActivityLog = null;
        try {
            loginActivityLog = await this.logController.logging(req.member, 'login');
        } catch (err) {
            console.log('> [MemberHandler]: ', err);
            return this.appResErr(res, err, 500, err.message || 'Database Operation Error', 500);
        }

        // 3.0 update mmeber infor with current logintoken with login activity entry
        req.member.set('activityLog', loginActivityLog._id);
        req.member.save();

        // finally
        this.appResAns(res, {
            ...memberInfo,
            point: req.member.point,
            key: nextnode.get('encrypt key'),
            loginToken: req.tokenInfo.loginToken,
        });
    }
    /*
    ** Main Control flow for login the member account
    ** Terry Chan
    */
    async signin(req, res) {
    	const result = await this.validateSignin(req, res);
    	if (result.err) {
    		console.log('> [MemberHandler]: ', result.err);
    		return this.multiResErr(res, req.language, errorTypes.singinFailed, null, 403);
    	}
    	const existingMember = result.existingMember;
    	// console.log('> [MemberHandler]: ', existingMember);
    	if (!existingMember.activate) {
    		return this.multiResErr(res, req.language, errorTypes.inactivedMember, null, 403);
    	}
    	if (!existingMember.accountStatus) {
    		return this.multiResErr(res, req.language, errorTypes.freezeMember, null, 403);
    	}

    	// 1.0 after action for login successful
    	const memberInfo = doPick(existingMember, this.secretMemberInfo);
    	const loginToken = generateToken(memberInfo);
    	existingMember.set('loginToken', loginToken);

    	// 2.0 login activity logging for the member account
    	var loginActivityLog = null;
    	try {
    		loginActivityLog = await this.logController.logging(existingMember, 'login');
    	} catch (err) {
    		console.log('> [MemberHandler]: ', err);
    		return this.appResErr(res, err, 500, err.message || 'Database Operation Error', 500);
    	}

    	// 3.0 update mmeber infor with current logintoken with login activity entry
    	existingMember.set('activityLog', loginActivityLog._id);
    	existingMember.save();

    	// finally
    	this.appResAns(res, {
    		...memberInfo,
            ...{
                key: nextnode.get('encrypt key'),
            },
    		loginToken,
    	});
    }

    /*
    ** Main Control flow for signup a member account
    ** Terry Chan
    */
    async signup(req, res) {
    	const newMemberData = await this.validateSignup(req, res);
    	if (newMemberData) {
	    	const newMember = new this.list.model();
	    	// 1.0 use Nextnode deletaged updateItem method to do the validation and execution of update information
	    	const error = await this.controller.create(req, newMember, newMemberData);
            console.log(error);
	    	
            // this.list.updateItem(newMember, newMemberData, { ignoreNoEdit: true }, err => {
	    	if (error) {
	    			// use the nextnode validation error handle instead
                return this.responseErrorFromNextNode(req, res, this.list, error);
	    	}
	    	
	    	// 2.0 send out the email with the email activate url to member email
            const contactUs = await ContactUsHandler.getContactData(req, res);
            const activateToken = await generateToken(req.body, '365d');
            const activateUrl = `${appDomain}/api/v1/user/activate?token=${activateToken}`;
	    	const emailOptions = await prepareEmailAuthTemplate(
		    	req.language,
		    	activateUrl,
		    	req.body,
		    	contactUs,
	    	);
	    	await sendMail(emailOptions);
	    	
	    		// finally
	    	return this.appResAns(res, doPick(newMember, this.secretMemberInfo));
	    	// });	
	    }
    }
    
    /*
	** Main Control flow for email authentication
	** Honor Cheung
    */
  //   async emailAuth(req, res) {
	 //    let view = '';
		// let language = {};
	 //    try {
		//     view = fs.readFileSync(`${global.__base}/static/views/emailAuth.html`);
		// 	language = viewsLanguagePack.emailAuth;
			
		// 	view = toReplace(view, '{headerImg}', `${appDomain}/static/images/header.png`);
		// 	view = toReplace(view, '{logoImg}', `${appDomain}/static/images/appLogo.png`);
			
		// 	const memberInfo = await validateToken(req.query.token);
		// 	const currentMember = await this.controller.getMemberByEmail(memberInfo.email);
		// 	const member = currentMember.toObject();
		// 	delete member.activate;
		// 	delete member.password;
		// 	delete member.password_confirm;
			
		// 	const error = await this.controller.update(req, currentMember, {
		// 	    ...member,
		// 	    activate: true,
		//     })
		    
		//     if (error) {
		// 	    return this.responseErrorFromNextNode(req, res, this.list, error);
		// 	}
	
		// 	view = toReplace(view, '{content}', language.content[currentMember.language]);
			
		// 	return res.send(view);
	 //    } catch (err) {
		//     console.log('> [MemberHandler]: ', err);
		//     view = toReplace(view, '{content}', language.expired[req.language]);
		//     return res.send(view);
	 //    }
  //   }
}

module.exports = new MemberHandler();