const nextnode          = require('next-nodecms');

const AttachmentUtil = require(`${global.__base}/utils/lib/attachment`);

class ImageUtil extends AttachmentUtil {
    constructor(list = {}, maxSize, allowed) {
        super(list);
        this.setMessage({
            format: 'invalidImageFormat',
            size: 'invalidImageSize',
        });
        this.setAllowed(allowed);
        this.setMaxSize(maxSize);
    }
}

module.exports = ImageUtil;