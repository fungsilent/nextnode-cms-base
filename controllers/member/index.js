const nextnode              = require('next-nodecms');
const _                     = require('lodash');

class MemberController {
    constructor() {
        this.list = nextnode.list('Member');
    	this.model = list.model;
    }

    async getMemberByAppToken(loginToken) {
        return await this.model.findOne({
            loginToken,
            accountStatus: true,
        });
    }
    async getMemberByEmail(email) {
        return await this.model.findOne({
            email: _.toLower(email),
        });
    }
    async getMemberById(id) {
        return await this.model.findById(id);
    }
    async getMemberByUsername(username) {
        return await this.model.findOne({
            username,
        });
    }
    async getMemberFromUsernameOrEmail(username) {
        return await this.model.findOne({
            $or: [
                // { username },
                { email: _.toLower(username) }
            ]
        });
    }
    /*
    ** isExisting member key info with username or email address
    ** @param: username, email
    ** Terry Chan
    ** 10/12/2018
    */
    async isExisting({ username, email }) {
    	return await this.model.count({
    		$or: [
    			// { username },
    			{ email: _.toLower(email)  }
    		]
    	});
    }
    checkExistingPassword(member, password) {
        return new Promise((resolve, reject) => {
            member._.password.compare(password, (err, result) => {
                if (err || !result) {
                    return reject(err || 'Password incorrect');
                }
                return resolve(null);
            });
        });
    }
    updateList(member, data, options) {
        const self = this;
        return new Promise(resolve => {
            self.list.updateItem(member, data, options, err => {
                resolve(err);
            }); 
        });
    }
    async create(req, member, data) {
       // const member = new nextnode.list('Member').model;

        return await this.updateList(member, data, {
            ignoreNoEdit: true,
            files: req.files,
            // fields: ['username', '', ''],
            user: req.user,
        });
    }
    async update(req, member, data) {
        return await this.updateList(member, data, {
            files: req.files,
            user: req.user,
        });
    }
    /*
    ** authorize the user for login as member 
    ** @param: info of data
    ** Terry Chan
    ** 10/12/2018
    */
    async authorised({ phone, password, country }) {
        var member = null;
        try {
            member = await this.model.findOne({
                phone,
                country,
                // accountStatus: true,
                // activate: true,
            });
            if (!member) {
                // no matter for error message, the customized error message will be thrown
                throw new Error('Invalid Member');
            }
            await this.checkExistingPassword(member, password);
        } catch (err) {

            throw err;
        }

        // update deviceId and deviceType for the account after login
        // if (deviceId) {
        //     member.set('deviceId', deviceId);
        // }
        // if (deviceType) {
        //     member.set('deviceType', deviceType);
        // }
        // if (language) {
        //     member.set('language', language);
        // }
        // if (notification) {
        //     member.set('notification', notification);
        // }
        return await member.save();
    	// return new Promise((resolve, reject) => {
	    // 	this.member._.password.compare(password, (err, result) => {
	    // 		if (err || !result) {
	    // 			return reject(err);
	    // 		}
	    // 		return resolve(this.member);
	    // 	});
	    // });
    }
    /*
    ** Signup member from app
    ** @param: info of data
    ** Terry Chan
    ** 10/12/2018
    */
    // async signup({ firstname, lastname, email, username, password, deviceId, deviceType, language }) {
    // 	const data = {
    // 		username,
    // 		lastname,
    // 		email,
    // 		fullname: {
    // 			first: firstname,
    // 			last: lastname,
    // 		},
    // 		deviceId,
    // 		language,
    // 		deviceType,
    // 	};
    // 	this.member = new this.model(data);
    // 	return await this.member.save();
    // }
}

module.exports = MemberController;
