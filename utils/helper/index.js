/*
* Utility included some helper static function
*/

const nextnode      = require('next-nodecms');
const moment        = require('moment');
const _forEach      = require('lodash/forEach');
const _map          = require('lodash/map');
const _findIndex    = require('lodash/findIndex');
const _isArray      = require('lodash/isArray');
const _filter       = require('lodash/filter');
const _sortBy       = require('lodash/sortBy');
const _keys         = require('lodash/keys');

const mongoose          = nextnode.mongoose;
const ValidationError   = mongoose.Error.ValidationError;
const ValidatorError    = mongoose.Error.ValidatorError;

const fs = require('fs');
const path = require('path');

function Utility() {}

const getElecticValue = (language, value, list) => {
    return _keys(value).reduce((a, key) => {
        const field = list.fields[key];
        if (field && field.options.multilingual && list.isMultilingualFormat(value[key]).length) {
            const defaultLanguage = nextnode.get('locale');
            a = {
                ...a,
                ...{
                    // use default language value instead if the target language is not exists
                    [key]: (value[key] && value[key][language]) 
                        || (value[key] && value[key][defaultLanguage]) || '',
                }
            };
        } else {
            a = {
                ...a,
                ...{
                    [key]: value[key] || '',
                }
            };
        }
        return a;
    }, {});
}

Utility.randomCharset = function randomCharset(length) {
    var text = "";
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
        text += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    return text;
}

/*
** @Number compare with two moment in minute
** @param1: source date (Date)
** @param2: target date (Date)
** @return: number in minute
** Terry Chan
** 15/12/2018
*/
Utility.getDatesDifferent = function getDatesDifferent(sourceDate, targetDate) {
    const duration = moment.duration(sourceDate.diff(targetDate));
    return duration.asMinutes();
}
/*
** Calculate the Chinese zobiac for the member according to their birthday
** Terry Chan
** 15/12/2018
*/
Utility.zobiacCalculation = function zobiacCalculation(schema, field, birthday) {
    const {
        paths: {
            [field]: {
                options: {
                    options,
                },
            },
        },
    } = schema;
    const year = +moment(birthday).format('YYYY');
    const zobiac = Math.round(year % 12);
    if (zobiac > options.length || zobiac < 0) {
        return null;
    }
    return options[zobiac].value;
}

/*
** Append language postfix to the static file path
** Terry Chan
** 13/12/2018
*/
Utility.appendLanguagePostFix = function appendLanguagePostFix(path, language) {
    return path.replace(/(\.[\w\d_-]+)$/i, '-'+language+'$1');
}

/*
** Get data from document field no matter it is multilingual object
** Terry Chan
** 13/12/2018
*/
Utility.getElecticsValue = function getElecticsValue(language, values, list) {
    // const self = this;
    if (_isArray(values)) {
        return _map(values, value => getElecticValue(language, value, list));
    }
    return getElecticValue(language, values, list);
};

Utility.getElecticValue = getElecticValue;

/*
** Sort the result list
** @param1: list to be sorted
** @param2: sorting field
** @param3: is descending ordering
** @Terry Chan, 01/08/2018
*/
Utility.sortResultListByOrdering = function(list, field, desc=true) {
    // console.log(list);
    var priorityList = _filter(list, r => r.ordering !== 0);
    const normalList = _filter(list, r => r.ordering === 0 || !r.ordering);
    priorityList = _sortBy(priorityList, field);
    if (desc) {
        priorityList = priorityList.reverse();
    }
    return [ ...priorityList, ...normalList ];
}

/*
** Add prefix to the target value with target length
** @param1: current value
** @param2: target length (default 6)
** @param3: prefix (default 0)
** @Terry Chan, 04/07/2018
*/
Utility.padNumber = (value, length = 6, prefix = '0000000') => (prefix +''+ value).slice(length * -1);

/*
** Check for a valid date from today
** @param1: startdate
** @param2: enddate
** @Terry Chan, 12/07/2018
*/
Utility.inValidDateRange = (start, end) => {
    const mStart = moment(start);
    const mEnd = moment(end);
    const mToday = moment({h: 0, m: 0});
    // console.log(mStart, mEnd, mToday, mStart.isSameOrBefore(mEnd) ? 1 : 0, mToday.isSameOrBefore(mStart) ? 2 : 3);
    return !mStart.isSameOrBefore(mEnd) || !mToday.isSameOrBefore(mStart);
};
Utility.inValidSingleDateRange = (date) => {
    const mDate = moment(date);
    const mToday = moment({h: 0, m: 0});
    return !mToday.isSameOrBefore(mDate);
};

module.exports = Utility;
