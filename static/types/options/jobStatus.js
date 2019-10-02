const toValues		= require('lodash/values');
const toKeys		= require('lodash/keys');
const nextnode      = require('next-nodecms');
const { Map }       = require('immutable');

var methodOptions = Map({
    tobeassigned1: {
        value: 'tobeassigned1',
        label: 'To be assigned 1',
    },
    tobeassigned2: {
        value: 'tobeassigned2',
        label: 'To be assigned 2',
    }, 
    tobecompleted1: {
        value: 'tobecompleted1',
        label: 'To be completed 1',
    },
    arrived: {
        value: 'arrived',
        label: 'Arrived',
    },
    tobecompleted2: {
        value: 'tobecompleted2',
        label: 'To be completed 2',
    },
    waitapproval: {
        value: 'waitapproval',
        label: 'Waiting Approval',
    },
    createsuccessfully: {
        value: 'createsuccessfully',
        label: 'Create Successfully',
    },
    manualhandle: {
        value: 'manualhandle',
        label: 'Manual Handle',
    },
});

methodOptions.pure = methodOptions.toJS();
methodOptions.values = toValues(methodOptions.pure);
methodOptions.options = toKeys(methodOptions.pure);
// statusOptions = new nextnode.Options.customized(statusOptions, statusLang);

module.exports = methodOptions;
