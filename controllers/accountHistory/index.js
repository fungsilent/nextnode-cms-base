const nextnode              = require('next-nodecms');
const isUndefined           = require('lodash/isUndefined');
const forKeys               = require('lodash/keys');
const forOwn                = require('lodash/forOwn');
const toReplace             = require('lodash/replace');
const moment                = require('moment');

const {
    cronJobTimeFormat
} = require(`${global.__base}/config`);
// Logger message
const {
    login: loginLoggerMessage,
    logout: logoutLoggerMessage,
    reset: resetLoggerMessage,
    forgot: forgotLoggerMessage,
} = require(`${nextnode.get('static')}/localization/message/logger`);

const {
    Schema:{
        Types:{
            ObjectId,
        },
    },
} = nextnode.mongoose;

class AccountHistoryController {
    constructor() {
    	this.list = nextnode.list('AccountHistory');
        this.model = list.model;
    }
    
    makeLoggerFullMessage(logger, message, mapping = {}) {
        var { history = {} } = logger;
        forOwn(message, (m, lang) => {
            forOwn(mapping, (value, key) => {
                m = toReplace(m, `<${key}>`, value);
            });

            history = {
                ...history,
                ...{
                    [lang]: [
                        ...history[lang] || [],
                        m,
                    ],
                }
            }
        });
        logger.set('history', history);
    }
    /*
    ** @param1: current logger Document
    ** @param2: token according to type either loginToken or resetToken
    ** @param3: type of member action (e.g. login, logout, forget password, reset password)
    ** Terry Chan
    ** 15/12/2018
    */
    logStatement(logger, token, type) {
        const date = moment().format(cronJobTimeFormat);
        switch (type) {
            case 'logout': 
                this.makeLoggerFullMessage(
                    logger,
                    logoutLoggerMessage,
                    {
                        date,
                    }
                );
                break;
            case 'forget': 
                this.makeLoggerFullMessage(
                    logger,
                    logoutLoggerMessage,
                    {
                        date,
                        token,
                    }
                );
                break;
            case 'reset':
                this.makeLoggerFullMessage(
                    logger,
                    logoutLoggerMessage,
                    {
                        date,
                    }
                );
                break;
            case 'login': 
                this.makeLoggerFullMessage(
                    logger,
                    loginLoggerMessage,
                    {
                        date,
                        token,
                    }
                );
                break;
            default: 
                // TODO
        }
    }
    /*
    ** Log the user account login activities
    ** @param: Member Document Object
    ** @param: is Login action
    ** Terry Chan
    ** 10/12/2018
    */
    async logging({ loginToken, forgotToken, _id }, type) {
        const condition = {
            member: _id,
        };
        let data = {
            member: _id,
            $inc: {
                loginCounter: 1,
            },
        };

        // update individual key field
        if (type === 'logout') {
            data = { ...data, ...{ lastLogout: moment().toDate() } };
        } else if (type === 'login') {
            data = { ...data, ...{ lastLogin: moment().toDate() } };
        }

        var logger = await this.model.findOne(condition);

        if (!logger) {
            logger = new this.model({
                ...data,
            });
        }

        const loggerMessage = this.logStatement(logger, loginToken || forgotToken, type);
        if (loggerMessage) {
            data = {
                ...data,
                ...{
                    $push: {
                        history: {
                            $each: [loggerMessage],
                        },
                    },
                },
            };
        }
 
        // const options = {
        //     upsert: true,
        //     new: true,
        // };

        return await logger.save();
        // this.model.findOneAndUpdate(condition, data, options);
    }
    
}

module.exports = AccountHistoryController;
