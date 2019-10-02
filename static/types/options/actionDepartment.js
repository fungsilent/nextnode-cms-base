const toValues		= require('lodash/values');
const toKeys		= require('lodash/keys');
const nextnode      = require('next-nodecms');
const { Map }       = require('immutable');

var methodOptions = Map({
    department1: {
        value: 'department1',
        label: 'Department 1',
    },
    department2: {
        value: 'department2',
        label: 'Department 2',
    }, 
});

methodOptions.pure = methodOptions.toJS();
methodOptions.values = toValues(methodOptions.pure);
methodOptions.options = toKeys(methodOptions.pure);
// statusOptions = new nextnode.Options.customized(statusOptions, statusLang);

module.exports = methodOptions;
