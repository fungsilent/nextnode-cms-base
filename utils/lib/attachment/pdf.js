const nextnode          = require('next-nodecms');
const crypto			= require('crypto');
const fs				= require('fs');
const doForEach         = require('lodash/forEach');
const isArray           = require('lodash/isArray');
const qpdf 				= require('node-qpdf');

const AttachmentUtil = require(`${global.__base}/utils/lib/attachment`);

const {
    encryptionCipher,
} = require(`${global.__base}/config`);


class PDFUtil extends AttachmentUtil {
    constructor(list = {}, maxSize, allowed, publicStorageDir, privateStorageDir) {
        super(list);
        this.setMessage({
            format: 'invalidPdfFormat',
            size: 'invalidPdfSize',
        });
        this.setAllowed(allowed);
        this.setMaxSize(maxSize);
        this.publicStorageDir = publicStorageDir;
        this.privateStorageDir = privateStorageDir;

        this.encryptFile = this.encryptFile.bind(this);
    }

    processEncrytion(field, doc) {
    	const sourcePdfPath = `${global.__base}/${this.publicStorageDir}/${doc.filename}`;
    	if (fs.existsSync(sourcePdfPath)) {
    		// read the content of pdf file
    		const fileContent = fs.readFileSync(sourcePdfPath);
    		if (fileContent) {
    			// start encryption for the pdf file using createCipher
		    	const cipher = crypto.createCipher(encryptionCipher, nextnode.get('encrypt key'));
		        const crypted = Buffer.concat([cipher.update(fileContent), cipher.final()]);
		        // export the encrypted pdf file to private dir
		        var newPdfPath = `${global.__base}/${this.privateStorageDir}/${doc.filename}`;
                // newPdfPath = newPdfPath.replace(/(\.[\w\d_-]+)$/i, `_$1`);
		        fs.writeFileSync(newPdfPath, crypted);
		        console.log(`> [PDFUtil/processEncrytion] "${newPdfPath}" the target PDF file has been encrypted.`);
		        fs.unlinkSync(sourcePdfPath);
		        console.log(`> [PDFUtil/processEncrytion] "${sourcePdfPath}" the source PDF file has been removed.`);
		    }
	    } else {
	    	console.log(`> [PDFUtil/processEncrytion] "${sourcePdfPath}" does not exist and ignore the target PDF file encryption.`);
	    }
        
    }

    // only for testing, return binary data for the decrypted pdf file
    processDecrytion(field, doc) {
    	const privatePdfPath = `${global.__base}/${this.privateStorageDir}/${doc.filename}`;
    	if (fs.existsSync(privatePdfPath)) {
    		// read the content of pdf file
    		const fileContent = fs.readFileSync(privatePdfPath);
    		if (fileContent) {
    			// start decryption for the pdf file using createDecipher
		    	const decipher = crypto.createDecipher(encryptionCipher, nextnode.get('encrypt key'));
		        const decrypted = Buffer.concat([decipher.update(fileContent), decipher.final()]);
		        // export the decrypted pdf file to public storage dir
		        const sourcePdfPath = `${global.__base}/${this.publicStorageDir}/${doc.filename}`;
		        
		        return decrypted;
		        // fs.writeFileSync(sourcePdfPath, decrypted);
		        // console.log(`> [PDFUtil/processDecrytion] "${sourcePdfPath}" the source PDF file has been decrypted.`);
		        // fs.unlinkSync(privatePdfPath);
		        // console.log(`> [PDFUtil/processEncrytion] "${privatePdfPath}" the encrypted PDF file has been removed.`);
		    }
	    } else {
	    	console.log(`> [PDFUtil/processDecrytion] "${privatePdfPath}" does not exist and ignore the target PDF file decryption.`);
	    }
        return null;
	}
	
	processKeyEncrytion(field, doc) {
    	const sourcePdfPath = `${global.__base}/${this.publicStorageDir}/${doc.filename}`;
    	if (fs.existsSync(sourcePdfPath)) {
			const newPdfPath = `${global.__base}/${this.privateStorageDir}/${doc.filename}`;
			const options = {
				keyLength: 128,
				password: nextnode.get('encrypt key'),
				outputFile: newPdfPath,
				restrictions: {
					print: 'low',
					useAes: 'y'
				}
			}
			console.log(`trying to encrypt to sourcePdfPath ${sourcePdfPath}`);
			qpdf.encrypt(sourcePdfPath, options, (data) => {
				console.log('test data: ', data);
				fs.unlinkSync(sourcePdfPath);
			});
		    console.log(`> [PDFUtil/processEncrytion] "${newPdfPath}" the target PDF file has been encrypted.`);
	    } else {
	    	console.log(`> [PDFUtil/processEncrytion] "${sourcePdfPath}" does not exist and ignore the target PDF file encryption.`);
	    }
        
    }
    /*
    ** Check all of invalid upload attachment
    ** @param1: fields to be checked
    ** @param2: Document object
    ** @Terry Chan, 28/11/2018
    */
    encryptFile(fields, doc) {
        doForEach(fields, f => {
            var field = super.getProperlyFieldValue(doc, f);
            if (!isArray(field)) {
                field = [field];
            }
            // console.log(field);
            doForEach(field, sf => this.processEncrytion(f, sf));
        });
	}
	
	encryptFileWithKey(fields, doc) {
        doForEach(fields, f => {
            var field = super.getProperlyFieldValue(doc, f);
            if (!isArray(field)) {
                field = [field];
            }
            // console.log(field);
            doForEach(field, sf => this.processKeyEncrytion(f, sf));
        });
    }
}

module.exports = PDFUtil;