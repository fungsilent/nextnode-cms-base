const nextnode          = require('next-nodecms');
const nodemailer        = require('nodemailer');
const toReplace         = require('lodash/replace');
const fs                = require('fs');
const {
    smtpUsername: user,
    smtpPassword: pass,
    smtpHost: host,
} = require(`${global.__base}/config`);
// language
const languagePack      = require(`${global.__base}/static/localization/message/email`);

// create reusable transporter object using the default SMTP transport
const smtpConfig = {
    host,
    port: 587,
    secure: false,
    auth: {
        user,
        pass,
    }
};
const transporter = nodemailer.createTransport(`smtps://${user}:${pass}@${host}/?pool=true`, smtpConfig);

const defaultMailOptions = {
    from: 'leeshingchaknoreply@gmail.com'
};

/*
** Constrcut the email option among to, text, subject and template html
** @param1: cl: current language
** @param2: new temp password
** @param3: Member Document Object
** @param4: ContactUs Document Object
** Terry Chan
** 15/12/2018
*/
const prepareForgotPasswordTemplate = (cl, newPassword, member, contact={}) => {
    let template = '';
    let languages = {};
    try {
        template = fs.readFileSync(nextnode.get('template path').forgotPassword);
        languages = languagePack.forgot;
    } catch (err) {
        return null;
    }
    template = toReplace(template, new RegExp('{{siteName}}', 'g'), nextnode.get('name'));
    template = toReplace(template, '{{siteLogo}}', nextnode.get('template logo access path'));
    template = toReplace(template, '{{customerServiceEmail}}', contact.email || '');
    template = toReplace(template, new RegExp('{{typeTitle}}', 'g'), languages.title[cl]);
    template = toReplace(template, '{{contentTitle}}', languages.header[cl]);
    template = toReplace(template, '{{following}}', languages.following[cl]);
    template = toReplace(template, '{{from}}', languages.from[cl]);
    template = toReplace(template, '{{recommend}}', languages.recommend[cl]);
    template = toReplace(template, '{{reminding}}', languages.reminding[cl]);
    template = toReplace(template, '{{newPassword}}', newPassword);

    return {
        subject: `${languages.subject[cl]} - ${nextnode.get('name')}`,
        text: languages.text[cl],
        html: template,
        to: member.email,
    };
};

const sendMail = (mailOptions) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(
            {
                ...defaultMailOptions,
                ...mailOptions,
            }, (error, info) => {
                if (error) {
                    console.log(error);
                    resolve(error);
                }
                console.log('> [sendMail]: Message sent: %s', info.response);
                resolve(info);
            }
        );
    });
};

module.exports = {
    sendMail,
    prepareForgotPasswordTemplate,
};
