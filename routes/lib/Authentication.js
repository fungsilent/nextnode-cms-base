const nextnode = require('next-nodecms');
const jwt = require('jsonwebtoken');

const generateToken = payload => {
	return jwt.sign(payload, nextnode.get('cookie secret'), {
		expiresIn: '1h'
	});
}

const validateToken = token => {
	var verify_ans;
	try {
		verify_ans = jwt.verify(token, nextnode.get('cookie secret'));
	}
	catch(err){
		console.log('auth.js -> validateToken -> err:', err);
		verify_ans = false
	};	
	return verify_ans;
}

const refreshToken = authorization =>  {
	const payload = jwt.decode(authorization.token);
	const newPayload = {
        _id: payload._id,
        glusCustomerId: payload.glusCustomerId,
        countryCode: payload.countryCode,
        phone: payload.phone
	};
	return jwt.sign(newPayload, nextnode.get('cookie secret'), {
		expiresIn: '1h',
	});
}

module.exports = {
	generateToken,
    validateToken,
	refreshToken
}
