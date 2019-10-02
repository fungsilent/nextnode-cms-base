const nextnode      = require('next-nodecms');
// const moment        = require('moment');
const Types         = nextnode.Field.Types;

// Plugins
const plugin        = require(`${global.__base}/${nextnode.get('model plugin path')}/member`);

/**
 * Members Model
 * ==========
 */
const Member = new nextnode.List('Member', {
    track: true,
    multilingual: false,
    map: {
        name: 'fullname',
    },
    searchFields: 'email, fullname, username, phone, gender',
    defaultColumns: 'fullname, country, phone, email, gender, accountStatus, activate',
});

Member.add(
    "Account Information",
    {
        // country: {
        //     type: Types.Relationship,
        //     ref: 'CountryList',
        //     required: true,
        //     initial: true,
        // },
        phone: {
            type: Types.Number,
            required: true,
            max: 999999999999999,
            min: 10000000,
            initial: true,
            index: true,
        },
        email: {
            type: Types.Email,
            // required: true,
            initial: true,
            // index: true,
        },
        password: {
            type: Types.Password,
            // use hook instaed
            // required: true,
            initial: true,
        },
    },
    "Personal Information",
    {
        title: {
            type: Types.Text,
            initial: true,
        },
        fullname: {
            type: Types.Name,
            required: true,
            initial: true,
        },
    },
    'Account Balance Information',
    {
        point: {
            type: Types.Number,
            default: 0,
        },
    },
    'Agreement Information',
    {
        acceptTc: {
            type: Types.Boolean,
            required: true,
            initial: true,
            default: false,
        },
        acceptTcAt: {
            type: Types.Datetime,
            required: true,
            initial: true,
        },
        subscriptionENews: {
            type: Types.Boolean,
            initial: true,
            default: false,
        },
        subscriptionENewsAt: {
            type: Types.Datetime,
            initial: true,
            dependsOn: {
                subscriptionENews: true,
            },
        },
    },
    'Status',
    {
        accountStatus: {
            type: Types.Boolean,
            default: true,
            realedit: true,
        },
        activate: {
            type: Types.Boolean,
            realedit: true,
            default: false,
        },
    },
    'Preferences',
    {
        deviceId: {
            type: Types.Text,
            noedit: true,
            // required: true,
            // initial: true,
        },
        deviceType: {
            type: Types.Select,
            assign: true,
            options: 'device',
            // required: true,
            // initial: true,
            default: 'ios'
        },
        language: {
            type: Types.Select,
            default: nextnode.get('locale'),
            required: true,
            initial: true,
            options: nextnode.get('support locales pack'),
        },
        notification: {
            type: Types.Boolean,
            realedit: true,
            default: false,
        }, 
    },
    "Account Logs",
    {
        loginToken: {
            type: Types.Text,
            noedit: true,
        },
        forgotToken: {
            type: Types.Text,
            noedit: true,
        },
        activityLog: {
            type: Types.Relationship,
            ref: 'AccountHistory',
            noedit: true,
        },
    },
);

Member.register({
    plugin,
});

// module.exports = Member;
