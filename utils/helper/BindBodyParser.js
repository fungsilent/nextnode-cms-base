const bodyParser 	= require('body-parser');
const multer 		= require('multer');

const bindBodyParser = app => {
    app.use(bodyParser.json({}));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(multer({ includeEmptyFields: true }));
};

module.exports = bindBodyParser;
