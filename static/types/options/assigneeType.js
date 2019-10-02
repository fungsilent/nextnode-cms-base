const toValues		= require('lodash/values');
const toKeys		= require('lodash/keys');
const nextnode      = require('next-nodecms');
const { Map }       = require('immutable');

var methodOptions = Map({
    internal: {
        value: 'internal',
        label: 'Internal',
    },
    contractor: {
        value: 'contractor',
        label: 'Contractor',
    }, 
});

methodOptions.pure = methodOptions.toJS();
methodOptions.values = toValues(methodOptions.pure);
methodOptions.options = toKeys(methodOptions.pure);
// statusOptions = new nextnode.Options.customized(statusOptions, statusLang);

module.exports = methodOptions;
