const nextnode          = require('next-nodecms');
// const moment            = require('moment');
const Types             = nextnode.Field.Types;

/**
 * App members Model
 * ==========
 */
const AccountHistory = new nextnode.List('AccountHistory', {
    track: false,
    noedit: true,
    nodelete: true,
    nocreate: true,
    multilingual: true,
    searchFields: 'member, loginCounter',
    defaultColumns: 'member, loginCounter, lastLogin, lastLogout',
});

AccountHistory.add(
    {
        member: {
            type: Types.Relationship,
            ref: 'Member',
            required: true,
            initial: true,
            index: true,
            noedit: true,
        },
        loginCounter: {
            type: Types.Number,
            default: 0,
            noedit: true,
        },
        lastLogin: {
            type: Types.Datetime,
            noedit: true,
        },
        lastLogout: {
            type: Types.Datetime,
            noedit: true,
        },
        history: {
            type: Types.TextArray,
            noedit: true,
            // fields: {
            //     isLogin: { type: Types.Boolean, default: true, noedit: true },
            //     loginAt: { type: Types.Datetime, noedit: true, },
            //     loginToken: {
            //         type: Types.Text,
            //         noedit: true,
            //     },
            // },
        },
    },
);

AccountHistory.register();

// module.exports = AccountHistory;
