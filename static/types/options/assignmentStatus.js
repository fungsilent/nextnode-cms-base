const toValues		= require('lodash/values');
const toKeys		= require('lodash/keys');
const nextnode      = require('next-nodecms');
const { Map }       = require('immutable');

var methodOptions = Map({
    assigned: {
        value: 'assigned',
        label: 'Assigned',
    },
    processing: {
        value: 'processing',
        label: 'Processing',
    }, 
    completed: {
        value: 'completed',
        label: 'Completed',
    }
});

methodOptions.pure = methodOptions.toJS();
methodOptions.values = toValues(methodOptions.pure);
methodOptions.options = toKeys(methodOptions.pure);
// statusOptions = new nextnode.Options.customized(statusOptions, statusLang);

module.exports = methodOptions;
