const { OrderedMap }    = require('immutable');
const nextnode          = require('next-nodecms');

// language to be mapped
const statusLang = {
    en: {
        select_option_pending: 'Pending Payment',
        select_option_completed: 'Completed Payment',
        select_option_cancelled: 'Cancelled',
        select_option_failed: 'Failed',
    },
    zhtw: {
        select_option_pending: '待付款',
        select_option_completed: '已完成付款',
        select_option_cancelled: '取消',
        select_option_failed: '付款失敗',
    },
    zhcn: {
        select_option_pending: '待付款',
        select_option_completed: '已完成付款',
        select_option_cancelled: '取消',
        select_option_failed: '付款失败',
    },
}

var statusOptions = OrderedMap({
    acceptable: {
        value: 'acceptable',
        label: 'Pending Payment',
        key: 'select_option_pending',
    },
    completed: {
        value: 'completed',
        label: 'Completed Payment',
        key: 'select_option_completed',
    },
    recalled: {
        value: 'recalled',
        label: 'Cancelled',
        key: 'select_option_cancelled',
    },
    failed: {
        value: 'failed',
        label: 'Failed',
        key: 'select_option_failed',
    },  
});


statusOptions = new nextnode.Options.customized(statusOptions, statusLang);

module.exports = statusOptions;
