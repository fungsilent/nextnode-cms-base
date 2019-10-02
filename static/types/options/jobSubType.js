const toValues		= require('lodash/values');
const toKeys		= require('lodash/keys');
const nextnode      = require('next-nodecms');
const { Map }       = require('immutable');

var methodOptions = Map({
    V03: {
        value: 'V03',
        label: 'V03',
        for: 'ZS01',
    },
    VN3: {
        value: 'VN3',
        label: 'VN3',
        for: 'ZS02',
    }, 
    VN7: {
        value: 'VN7',
        label: 'VN7',
        for: 'ZS02',
    }, 
    VNA: {
        value: 'VNA',
        label: 'VNA',
        for: 'ZS02',
    }, 
});

methodOptions.pure = methodOptions.toJS();
methodOptions.values = toValues(methodOptions.pure);
methodOptions.options = toKeys(methodOptions.pure);
// statusOptions = new nextnode.Options.customized(statusOptions, statusLang);

module.exports = methodOptions;
