import util from '@/common/method/util';

export default {

    /**
     * 车场类型
     * @param value
     * @return {*}
     */
    parkType(value) {
        switch (value) {
        case 0:
            return '路内';
        case 1:
            return '路外';
        default:
            return '其它';
        }
    },

    /**
     * 值班情况
     * @param value
     * @return {*}
     */
    workType(value) {
        switch (value) {
        case 0:
            return '旷工';
        case 1:
            return '值班中';
        case 2:
            return '关场';
        default:
            return '其它';
        }
    },

    /**
     * 工作状态
     * @param row {Object} 字段
     */
    formatWorkStatus(value) {
        switch (value) {
        case 0:
            return '无效';
        case 1:
            return '正常工作';
        case 2:
            return '迟到';
        case 3:
            return '未签退';
        case 4:
            return '早退';
        case 5:
            return '迟到且早退';
        case 6:
            return '迟到且未签退';
        default:
            return '其它';
        }
    },

    /**
     * 预约类型
     * @param value
     * @return {*}
     */
    appointmentType(value) {
        switch (value) {
        case 1:
            return '车场预约';
        case 2:
            return '车位预约';
        case 3:
            return '车场及车位预约';
        case 4:
            return '不支持预约';
        default:
            return '其它';
        }
    },

    /**
     * 过滤职务
     * */
    formatterOpType(value) {
        switch (value) {
        case 1:
            return '现场值守员';
        case 2:
            return '巡检员';
        default:
            return '其它';
        }
    },

    /**
     * 格式化时间 2018-07-02 13:12:12
     * @param {*} value
     */
    formatDateYearMonthDayAndHms(value) {
        return util.formatDateYearMonthDayAndHms(value);
    },

    /**
     * 格式化订单状态
     * @param {*} value
     */
    formatOrderStatus(value) {
        switch (value) {
        case 1:
            return '预约待停';
        case 2:
            return '泊车待停';
        case 3:
            return '停车中';
        case 4:
            return '已完成(缴费)';
        case 5:
            return '已完成(欠费)';
        case 6:
            return '已取消';
        case 7:
            return '投诉';
        case 8:
            return '异常';
        default:
            return '其它';
        }
    },

    /**
     * 格式化停车时长
     * @param {*} value
     */
    formatCountTime(value) {
        if (value) {
            return util.secondToDate(value);
        }
        return '0秒';
    },

    /**
     * 过滤订单支付状态
     * @param {*} row
     */
    formatOrderPayStatus(value) {
        switch (value) {
        case 0:
            return '待处理';
        case 1:
            return '未支付';
        case 2:
            return '已支付';
        case 3:
            return '未完全支付';
        default:
            return '其它';
        }
    },

    /**
     * 格式化车牌颜色
     * @param {*} value
     */
    formatLicenseColor(value) {
        switch (value) {
        case 1:
            return '黄牌';
        case 2:
            return '蓝牌';
        case 3:
            return '白牌';
        case 4:
            return '绿牌';
        case 5:
            return '黑牌';
        default:
            return '未知';
        }
    },

    /**
     * 认证状态
     * @param value {Number} value
     */
    verifyType(value) {
        switch (value) {
        case 0:
            return '未认证';
        case 1:
            return '审核中';
        case 2:
            return '已认证';
        case 3:
            return '审核未通过';
        default:
            return '-';
        }
    },

    /**
     * 过滤核实状态
     * @param row {Number} 订单状态码
     */
    formatLicenseVerifyStatus(value) {
        switch (value) {
        case 0:
            return '未核';
        case 1:
            return '已核';
        default:
            return '其它';
        }
    },

    /**
     * 过滤卡类型
     * @param {*} value
     */
    formatChargeType(value) {
        switch (value) {
        case 'small':
            return '小型车';
        case 'middle':
            return '中型车';
        case 'big':
            return '大型车';
        case 'special':
            return '特殊类';
        default:
            return '其它';
        }
    },

    /**
     * 过虑车位状态
     */
    formatPortStatus(value) {
        switch (value) {
        case 1:
            return '空闲';
        case 2:
            return '预约';
        case 3:
            return '使用中';
        case 4:
            return '停用';
        default:
            return '其它';
        }
    },

    /**
     * 过虑车位类型
     */
    formatPortType(value) {
        switch (value) {
        case 0:
            return '普通车位';
        case 1:
            return '地磁车位';
        case 2:
            return '一体化车位';
        default:
            return '其它';
        }
    },

    /**
     * 过滤车位容量大小
     * @param {*} port
     * @param {*} val
     */
    formatPortSize(value) {
        switch (value) {
        case 0:
            return '小车位';
        case 1:
            return '大车位';
        case 2:
            return '标准车位';
        default:
            return '其它';
        }
    },

    /**
     * 格式化设备在线状态
     * @param {*} value
     */
    formatOnLineStatus(value) {
        switch (status) {
        case 1:
            return '在线';
        case 2:
            return '离线';
        case 3:
            return '停用';
        default:
            return '其它';
        }
    },

    /**
     * 过滤设备运行状态/健康状态
     * @param {*} val
     */
    formatLockDeviceStatus(value) {
        switch (value) {
        case 0:
            return '正常';
        case 1:
            return '异常';
        case 2:
            return '故障';
        case 3:
            return '维护';
        default:
            return '其它';
        }
    },

    /***
     * 格式化终端设备
     * @param row {Number} 设备代号
     * */
    formatDeviceType(value) {
        switch (value) {
        case 1:
            return '手机';
        case 2:
            return 'PDA';
        case 3:
            return '平板';
        default:
            return '其它';
        }
    },

    /**
     * 开户行过滤器
     * @return {*}
     */
    formatAccountType(value) {
        switch (value) {
        case 'WECHAT_ACOUNT':
            return '微信商户号';
        case 'ALI_ACOUNT':
            return '支付宝商户号';
        default:
            return '未知';
        }
    },

    /**
     * 过滤提现状态
     * @param {*} value
     */
    formatCashStatus(value) {
        switch (value) {
        case 0:
            return '待处理';
        case 1:
            return '通过';
        case 2:
            return '驳回申请';
        default:
            return '-';
        }
    },

    /**
     * 支付方式
     * @param {*} value
     */
    formatPayType(value) {
        switch (value) {
        case 1:
            return '钱包余额';
        case 2:
            return '支付宝';
        case 3:
            return '微信';
        case 4:
            return '现金';
        case 5:
            return '白名单车';
        case 6:
            return '月卡车';
        case 7:
            return '免费';
        default:
            return '-';
        }
    },

    /**
     * 订单类型
     * @param {*} value
     */
    formatOrederType(value) {
        switch (value) {
        case 0:
            return '线下';
        case 1:
            return '线上';
        default:
            return '-';
        }
    },

    /**
     * 处理类型
     * 0平账 ，1退款，2管理员预缴退款 3 停车订单核销
     * @param {*} value
     */
    formatRecordType(value) {
        switch (Number(value)) {
        case 0:
            return '平账';
        case 1:
            return '退款';
        case 2:
            return '管理员预缴退款';
        case 3:
            return '停车订单核销';
        default:
            return '-';
        }
    }
};