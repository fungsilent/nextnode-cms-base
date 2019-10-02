const nextnode          = require('next-nodecms');
const doForEach         = require('lodash/forEach');
const doValues          = require('lodash/values');
const replace           = require('lodash/replace');
const isArray           = require('lodash/isArray');
// Language Pack
const messagePack       = require(`${global.__base}/static/locales/${nextnode.get('langf') || nextnode.get('locale')}`);

class AttachmentUtil {

    constructor(list) {
        this.list = list;
        this.fields = list.fields || {};
    }

    setAllowed(allowed) {
        this.allowed = allowed;
    }

    setMessage(messages) {
        this.message = messages;
    }

    setMaxSize(maxSize) {
        this.maxSize = maxSize;
    }

    getProperlyFieldValue(doc, f) {
        const field = this.fields[f];
        if (field) {
            const { options: { multilingual } } = field;
            const target = doc[f];
            if (multilingual && this.list.isMultilingualFormat(target).length) {
                return doValues(target);
            } else {
                return typeof target === 'string' ? target : '';
            }
        }
        return '';
    }

    validation(field, doc) {
        if (doc.filename) {
            // console.log(doc.size, this.maxSize);
            const allowed = this.allowed.indexOf(doc.mimetype) !== -1;
            var message = null;
            if (!allowed) {
                message = replace(
                    messagePack[this.message.format].content, '<value>', this.allowed.join(', ')
                );
            } else if (doc.size > this.maxSize) {
                message = replace(
                    messagePack[this.message.size].content, '<value>', (this.maxSize / 1024 / 1024)
                );
            }
        } 
        return message;
    }

    /*
    ** Check all of invalid upload attachment
    ** @param1: fields to be checked
    ** @param2: Document object
    ** @Terry Chan, 12/11/2018
    */
    validAttachmentCheck (fields, doc) {
        let error = null;
        // return new Promise(resolve => {
        doForEach(fields, f => {
            var field = this.getProperlyFieldValue(doc, f);
            if (!isArray(field)) {
                field = [field];
            }
            doForEach(field, sf => error = this.validation(f, sf));
        });
        return error;
    }
}

module.exports = AttachmentUtil;
