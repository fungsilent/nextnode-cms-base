/*
** 1XX - user signup and login related
** 2XX - common related
** 4XX - query related
** 5XX - payment related
*/
const en = {
    duplicatedSignupRequest: {
        errCode: 100,
        content: 'You are not allowed to signup again after login your account.',
    },

    singinRequired: {
        errCode: 101,
        content: 'You must signin your member account first.',
    },

    invalidAuthorizationSchema: {
    	errCode: 102,
        content: 'You must use the Bearer schema for the Authorization Header.',
    },

    noSuchMember: {
    	errCode: 103,
        content: 'No valid member account',
    },

    invalidEmailOrUsername: {
    	errCode: 104,
        content: 'Please input the valid Email and Username',
    },

    duplicatedEmail: {
    	errCode: 104,
        content: 'The Email is being used.',
    },

    duplicatedUsername: {
    	errCode: 104,
        content: 'The Username is being used.',
    },

    invalidParamFields: {
    	errCode: 104,
        content: 'The followings fields are invalid or missing (<value>)',
    },
    validationError: {
    	errCode: 104,
        content: 'Please make sure all of mandatory fields are provided properly.',
    },
    loginAccountFailed: {
    	errCode: 104,
        content: 'Login Failed! The username or password is incorrect.',
    },
    disabledMemberAccount: {
    	errCode: 104,
        content: 'Your member account is freezed. Please contact our Administrator for the helps.',
    },
    inactivatedMemberAccount: {
    	errCode: 104,
        content: 'Your member account is not activated. Please contact our Administrator for the helps.',
    },
    invalidImageFormat: {
        errCode: 200,
        content: 'The upload image format is invalid (supporting <value>)',
    },
    invalidImageSize: {
        errCode: 200,
        content: 'The upload image file size is invalid (less than <value> MB)',
    },
    invalidPdfFormat: {
        errCode: 200,
        content: 'The upload file format is invalid (supporting <value>)',
    },
    invalidPdfSize: {
        errCode: 200,
        content: 'The upload file size is invalid (less than <value> MB)',
    },
    passwordMissing: {
        errCode: 200,
        content: 'The password must not be empty.',
    },
    invalidFormatBirthday: {
        errCode: 200,
        content: 'The birthday is missing or is incorrect',
    },
    invalidDateFormatBirthday: {
        errCode: 200,
        content: 'The birthday is format is invalid',
    },
    invalidUpdateInfo: {
        errCode: 200,
        content: 'Member profile update failed',
    },
    noSuchMemberExisting: {
        errCode: 200,
        content: 'No such member exists',
    },
    noSuchEmailForgotTemplate: {
        errCode: 200,
        content: 'No email template for forgot password',
    },
    forgotPasswordFailure: {
        errCode: 200,
        content: 'The forgot password request cannot be accomplished. Please contact our system administrator',
    },
    hasMemberBoughtBook: {
        errCode: 200,
        content: 'This book has been bought by <value> member so you are not allowed to remove it. However you can set "Provided Purchase" config to be closed If you want to disable for public purchase, and the member who bought this book still can view this book anyway.',
    },
    invalidTableOfContentPage: {
        errCode: 200,
        content: '<value> The page number of table of content must be numeric value.',
    },
    paymentStatusInvalid: {
        errCode: 404,
        content: 'The requested payment status is incorrect',
    },
    cannotFoundItem: {
        errCode: 404,
        content: 'The item cannot be found.',
    },
    cannotFoundList: {
        errCode: 404,
        content: 'The list cannot be found.',
    },
    cannotFoundBook: {
        errCode: 404,
        content: 'No book found.',
    },
    cannotFoundBookList: {
        errCode: 404,
        content: 'No any book in the list.',
    },
    queryListFailed: {
        errCode: 404,
        content: 'Fail to retrieve the list',
    },
    productNotFound: {
        errCode: 404,
        content: 'Product Not Found.',
    },
    categoryNotFound: {
        errCode: 404,
        content: 'Product Category Not Found.',
    },
    notEnoughPoint: {
        errCode: 406,
        content: 'You do not have enough points to finish the redemption',
    },
    notEnoughInventory: {
        errCode: 406,
        content: 'The inventory is out of stock',
    },
    paymentNotComplated: {
        errCode: 500,
        content: 'Initialize Payment cannot be accomplished',
    },
    paymentDuplicated: {
        errCode: 500,
        content: 'You bought the book. Please do not pay it again',
    },
    cannotGetSystemConfig: {
        errCode: 500,
        content: 'The system config cannot be loaded. Please try again.'
    },
}

module.exports = en;
