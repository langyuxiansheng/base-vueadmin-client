import util from '@/common/method/util';

export default {

    /**
     * 格式化时间 2018-07-02 13:12:12
     * @param {*} value
     */
    formatDateYearMonthDayAndHms(value) {
        return util.formatDateYearMonthDayAndHms(value);
    },

    /**
     * 格式化时长
     * @param {*} value
     */
    formatCountTime(value) {
        if (value) {
            return util.secondToDate(value);
        }
        return '0秒';
    }

};