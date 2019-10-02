const toValues		= require('lodash/values');
const toKeys		= require('lodash/keys');
const nextnode      = require('next-nodecms');
const { Map }       = require('immutable');

var methodOptions = Map({
    onsite: {
        value: 'onsite',
        label: 'onSite',
    },
    hkmwl: {
        value: 'hkmwl',
        label: 'Hong Kong Motoring Workshop Limited',
    }, 
    klmwl: {
        value: 'klmwl',
        label: 'Kowloon Motoring Workshop Limited',
    }, 
    tmmwl: {
        value: 'tmmwl',
        label: 'Tuen Mun Motoring Workshop Limited',
    }, 
    fgmwl: {
        value: 'fgmwl',
        label: 'Fen Garden Motoring Workshop Limited',
    }, 
    shmwl: {
        value: 'shmwl',
        label: 'Siu Ho Wan Motoring Workshop Limited',
    }, 
    todepartment: {
        value: 'todepartment',
        label: 'To Department',
    }, 
    tocenter: {
        value: 'tocenter',
        label: 'To Detention Center',
    },
    // carkey: {
    //     value: 'carkey',
    //     label: 'Car Key',
    // }, 
    // onoffice: {
    //     value: 'onoffice',
    //     label: 'On Office',
    // }, 
});

methodOptions.pure = methodOptions.toJS();
methodOptions.values = toValues(methodOptions.pure);
methodOptions.options = toKeys(methodOptions.pure);
// statusOptions = new nextnode.Options.customized(statusOptions, statusLang);

module.exports = methodOptions;
