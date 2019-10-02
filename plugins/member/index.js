const nextnode              = require('next-nodecms');
// const moment              	= require('moment');

const messagePack       	= require(`${global.__base}/static/locales/${nextnode.get('langf') || nextnode.get('locale')}`);

const errorType = {
	emptyPassword: 'passwordMissing',
}

function MemberHook (schema, options) {
    // store the current diver entry
    schema.post('init', function (doc) {
        // the type cannot be changed, if the driver exists
        if (!this.isNew) {
            doc.currentMember = { ...doc.toObject() };
        }
    });
    schema.pre('save', function (next) {
    	var error = null;

    	// 1.0 password mandatory checking
    	if (!this.currentMember && !this.password) {
    		error = new Error(messagePack[errorType.emptyPassword].content);
    	}

        next(error);
    });
}

module.exports = MemberHook;
