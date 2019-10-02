const nextnode              	= require('next-nodecms');
const MemberHandler             = require(`${global.__base}/${nextnode.get('routes path')}/member`);

// Setup Common Route Bindings
exports = module.exports = app => {
	// app.get('/api/v1/user/activate', MemberHandler.emailAuth);
    app.post('/api/v1/user/signup', MemberHandler.signup);
    app.post('/api/v1/user/signin', MemberHandler.signin);
    // app.post('/api/v1/user/forgot', MemberHandler.forgotPassword);
};
