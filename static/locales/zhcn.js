const zhcn = {
    duplicatedSignupRequest: {
        errCode: 100,
        content: '登录您的帐户后，您不能再次注册。'
    },
    singinRequired: {
        errCode: 101,
        content: '您必须先登录您的会员帐户',
    },
    invalidAuthorizationSchema: {
    	errCode: 102,
        content: '您必须将承载架构用于HTTP授权头栏位',
    },
    noSuchMember: {
    	errCode: 103,
        content: '没有有效的会员帐户',
    },
    invalidEmailOrUsername: {
    	errCode: 104,
        content: '請輸入有效的電子郵件和用戶名',
    },
    duplicatedEmail: {
    	errCode: 104,
        content: '電子郵件已被使用',
    },
    duplicatedUsername: {
    	errCode: 104,
        content: '用戶名稱已被使用',
    },
    invalidParamFields: {
    	errCode: 104,
        content: '以下资料无效或缺失 (<value>)',
    },
    validationError: {
    	errCode: 104,
        content: '请确保所有必须的资料已输入无误',
    },
    loginAccountFailed: {
    	errCode: 104,
        content: '登录失败！用户名或密码无效',
    },
    disabledMemberAccount: {
    	errCode: 104,
        content: '您的会员帐户已冻结，请联系我们的管理员获取帮助。',
    },
    inactivatedMemberAccount: {
    	errCode: 104,
        content: '您的会员帐户尚未激活，请联系我们的管理员获取帮助。',
    },
    invalidImageFormat: {
        errCode: 200,
        content: '上传图片格式无效（支持<value>）',
    },
    invalidImageSize: {
        errCode: 200,
        content: '上传图片文件大小无效 (少於<value>MB)',
    },
    invalidPdfFormat: {
        errCode: 200,
        content: '上传档案格式无效（支持<value>）',
    },
    invalidPdfSize: {
        errCode: 200,
        content: '上传档案大小无效 (少於<value>MB)',
    },
    passwordMissing: {
        errCode: 200,
        content: '密码不能为空',
    },
    invalidFormatBirthday: {
        errCode: 200,
        content: '出生日期不正确',
    },
    invalidDateFormatBirthday: {
        errCode: 200,
        content: '出生日期格式不正确',
    },
    invalidUpdateInfo: {
        errCode: 200,
        content: '会员资料更新失败',
    },
    noSuchMemberExisting: {
        errCode: 200,
        content: '会员不存在',
    },
    noSuchEmailForgotTemplate: {
        errCode: 200,
        content: '忘记密码电子邮件的模板不存在',
    },
    forgotPasswordFailure: {
        errCode: 200,
        content: '忘记密码请求无法完成。 请联系我们的系统管理员',
    },
    hasMemberBoughtBook: {
        errCode: 200,
        content: '本书已被<value>位成员购买，您不能将其删除。但您可以把「已提供购买」配置设置为关闭如果您要禁止公开购买，而已經购买此书的会员仍然可以查看此书',
    },
    invalidTableOfContentPage: {
        errCode: 200,
        content: '<value> 书本目录页码必须是数字',
    },
    paymentStatusInvalid: {
        errCode: 404,
        content: '所要求查找的付款状态无效',
    },
    cannotFoundItem: {
        errCode: 404,
        content: '找不到该项目',
    },
    cannotFoundList: {
        errCode: 404,
        content: '找不到該內容',
    },
    cannotFoundBook: {
        errCode: 404,
        content: '找不到該书的內容',
    },
    cannotFoundBookList: {
        errCode: 404,
        content: '没有任何书本',
    },
    queryListFailed: {
        errCode: 404,
        content: '无法检索列表',
    },
    productNotFound: {
        errCode: 404,
        content: '找不到产品',
    },
    categoryNotFound: {
        errCode: 404,
        content: '找不到产品类别',
    },
    notEnoughPoint: {
        errCode: 406,
        content: '您没有足够的积分来完成兑换',
    },
    notEnoughInventory: {
        errCode: 406,
        content: '库存缺货',
    },
    paymentNotComplated: {
        errCode: 500,
        content: '初始化付款无法完成',
    },
    paymentDuplicated: {
        errCode: 500,
        content: '你已买了这本书，请不要再购买',
    },
    cannotGetSystemConfig: {
        errCode: 500,
        content: '无法加载系统配置! 请再试一次!'
    },
}

module.exports = zhcn;
