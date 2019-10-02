const nextnode              = require('next-nodecms');
const MemberHandler         = require(`${global.__base}/${nextnode.get('routes path')}/member`);
// const PurchaseHandler       = require(`${global.__base}/routes/handler/purchase`);
// const BookHandler           = require(`${global.__base}/routes/handler/book`);

const {
	requiredMember,
} = require(`${global.__base}/routes/middleware`);

// Setup Member Route Bindings
exports = module.exports = app => {
    app.all('/api/v1/member/*', requiredMember);
    /*
    ** handle for update profile operations
    ** use the nextnode delegated update method, can be used to update any info of member
    ** e.g. turn on/off notification
	** e.g. switch member account language
	** Terry Chan
	** 15/12/2018
    */
    app.get('/api/v1/member/status', MemberHandler.accountStatus);
    app.put('/api/v1/member/info', MemberHandler.updateInfo);
    app.get('/api/v1/member/signout', MemberHandler.signout);
};
