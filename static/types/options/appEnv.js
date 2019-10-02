/*
 *  @file       AppEnv.js
 *  @author     Terry Chan
 *  @date       19-10-2018
 *
 *  @description
 *  Immutable file for Server App Env
 */
const { Map } = require('immutable');

const AppEnv = Map({
	localhost: 'localhost',
	development: 'development',
    beta: 'beta',
    production: 'production',
});

module.exports = AppEnv;
