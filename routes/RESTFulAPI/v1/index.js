const moment              = require('moment');
const nextnode            = require('next-nodecms');
// const express             = require('express');

const { sendGetRes }      = require(`${global.__base}/routes/lib/APIRequestHelper`);
// const CommonV1            = require(`${global.__base}/routes/RESTFulAPI/v1/common`);
const MemberV1            = require(`${global.__base}/routes/RESTFulAPI/v1/member`);
const UserV1              = require(`${global.__base}/routes/RESTFulAPI/v1/user`);

// Setup Route Bindings
exports = module.exports = app => {
    app.get('/api/v1/heathCheck', (req, res) => {
        const data = {
            status: true,
            apiVersion: nextnode.get('api version'),
            timestamp: moment(),
        };
        sendGetRes(req, res, data);
    });

    // CommonV1(app);
    // before login and config stage routes
    UserV1(app);
    // after login routes
    MemberV1(app);
};
