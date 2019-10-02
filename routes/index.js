/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */
const nextnode      = require('next-nodecms');
const _replace      = require('lodash/replace');
const _camelCase    = require('lodash/camelCase');
const cors          = require('cors');
const moment        = require('moment');
const express       = require('express');
const url           = require('url');
// Configurations
const { 
	appDomain,
} = require(`${global.__base}/config`);
// API Sets
const RESTFullAPIV1         = require(`${global.__base}/routes/RESTFulAPI/v1`);
// const ClientAPI             = require(`${global.__base}/routes/ClientAPI`);
// API 
const { sendGetRes }        = require(`${global.__base}/routes/lib/APIRequestHelper`);
const { generateToken }     = require(`${global.__base}/routes/lib/Authentication`);

const {
    requireLanguage,
    initialRequest,
    initLocals,
    initConfig,
} = require(`${global.__base}/routes/middleware`);

// Common Middleware
// nextnode.pre('routes', initLocals);

// Setup Route Bindings
exports = module.exports = app => {
    
    app.use('/static', express.static(nextnode.get('images access path')));
    // used for config or static file access
    app.use('/shared', express.static(nextnode.get('config access path'))),
    app.use('/uploads', express.static(nextnode.get('upload access path')));

    app.use(cors());
    app.options('*', cors());

    app.use('/api/*', requireLanguage, initLocals);

    app.all('/api/*', initialRequest);
    // get RESTAPI list
    app.get('/api/v1', (req, res) => {
        const data = {
            apiVersion: nextnode.get('api version'),
            domain: appDomain,
            language: req.language,
            // return all of RESTful API endpoint to the client with Camel Case
            api: app._router.stack
                .filter(r => 
                    r.route && r.route.path 
                    && /^\/api\/v1\//.test(r.route.path))
                .reduce((a, b) => {
                    const key = _camelCase(_replace(b.route.path , '/', ''));
                    if (key !== 'apiV1') {
                        a = {
                            ...a,
                            ...{
                                [key]: `${appDomain}${b.route.path}`,
                            },
                        };
                    }
                    return a;
                }, {}),
        };
        sendGetRes(req, res, data);
    });

    // REST API Version 1 routings
    RESTFullAPIV1(app);
};
