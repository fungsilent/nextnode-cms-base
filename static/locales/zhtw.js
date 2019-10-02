const zhtw = {
    duplicatedSignupRequest: {
        errCode: 100,
        content: '登錄您的帳戶後，您不能再次註冊。',
    },
    singinRequired: {
        errCode: 101,
        content: '您必須先登錄您的會員帳戶',
    },
    invalidAuthorizationSchema: {
    	errCode: 102,
        content: '您必須將Bearer架構用於HTTP授權頭欄位',
    },
    noSuchMember: {
    	errCode: 103,
        content: '沒有有效的會員帳戶',
    },
    invalidEmailOrUsername: {
    	errCode: 104,
        content: '请输入有效的电子邮件和用户名',
    },
    duplicatedEmail: {
    	errCode: 104,
        content: '电子邮件已被使用',
    },
    duplicatedUsername: {
    	errCode: 104,
        content: '用户名已被使用',
    },
    invalidParamFields: {
    	errCode: 104,
        content: '以下資料無效或缺失 (<value>)',
    },
    validationError: {
    	errCode: 104,
        content: '请确保所有必须的资料已输入无误',
    },
    loginAccountFailed: {
    	errCode: 104,
        content: '登錄失敗！用戶名或密碼無效',
    },
    disabledMemberAccount: {
    	errCode: 104,
        content: '您的會員帳戶已凍結，請聯繫我們的管理員獲取幫助。',
    },
    inactivatedMemberAccount: {
    	errCode: 104,
        content: '您的會員帳戶尚未激活，請聯繫我們的管理員獲取幫助。',
    },
    invalidImageFormat: {
        errCode: 200,
        content: '上傳圖片格式無效（支持<value>）',
    },
    invalidImageSize: {
        errCode: 200,
        content: '上傳圖片文件大小無效 (少於<value>MB)',
    },
    invalidPdfFormat: {
        errCode: 200,
        content: '上傳檔案格式無效（支持<value>）',
    },
    invalidPdfSize: {
        errCode: 200,
        content: '上傳檔案大小無效 (少於<value>MB)',
    },
    passwordMissing: {
        errCode: 200,
        content: '密碼不能為空',
    },
    invalidFormatBirthday: {
        errCode: 200,
        content: '出生日期不正確',
    },
    invalidDateFormatBirthday: {
        errCode: 200,
        content: '出生日期格式不正確',
    },
    invalidUpdateInfo: {
        errCode: 200,
        content: '會員資料更新失敗',
    },
    noSuchMemberExisting: {
        errCode: 200,
        content: '會員不存在',
    },
    noSuchEmailForgotTemplate: {
        errCode: 200,
        content: '忘記密碼電子郵件的模板不存在',
    },
    forgotPasswordFailure: {
        errCode: 200,
        content: '忘記密碼請求無法完成。 請聯繫我們的系統管理員',
    },
    hasMemberBoughtBook: {
        errCode: 200,
        content: '本書已被<value>位成員購買了，所以您不能將其刪除。但您可以把「已提供購買」配置設置為關閉如果您要禁止公開購買，而已經購買此書的會員仍然可以查看此書',
    },
    invalidTableOfContentPage: {
        errCode: 200,
        content: '<value> 書籍目錄頁碼必須是數字',
    },
    paymentStatusInvalid: {
        errCode: 404,
        content: '所要求查找的付款狀態無效',
    },
    cannotFoundItem: {
        errCode: 404,
        content: '找不到該項目',
    },
    cannotFoundList: {
        errCode: 404,
        content: '找不到該內容',
    },
    productNotFound: {
        errCode: 404,
        content: '找不到產品',
    },
    categoryNotFound: {
        errCode: 404,
        content: '找不到產品類別',
    },
    cannotFoundBook: {
        errCode: 404,
        content: '找不到該書的內容',
    },
    cannotFoundBookList: {
        errCode: 404,
        content: '沒有任何書本',
    },
    queryListFailed: {
        errCode: 404,
        content: '無法檢索列表',
    },
    notEnoughPoint: {
        errCode: 406,
        content: '您沒有足夠的積分來完成兌換',
    },
    notEnoughInventory: {
        errCode: 406,
        content: '庫存缺貨',
    },
    paymentNotComplated: {
        errCode: 500,
        content: '初始化付款無法完成',
    },
    paymentDuplicated: {
        errCode: 500,
        content: '你已買了這本書，請不要再購買',
    },
    cannotGetSystemConfig: {
        errCode: 500,
        content: '無法加載系統配置! 請再試一次!',
    },
}

module.exports = zhtw;
