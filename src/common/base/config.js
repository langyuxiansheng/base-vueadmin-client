/**
 * Created by Administrator on 2018/1/12 0012.
 * 公共插件功能配置文件
 */
export default {
    size: 'mini',
    tableSize: 'mini',
    defaultTime: ['00:00:00', '23:59:59'],
    baiDuMapKey: '3GGKnVpSku9u2S17oalzlU6LmYHZoGLy', //百度地图秘钥
    aMapKey: '58d947beaa66523514fdeffe22dd3c59', //高德地图秘钥
    labelPosition: 'top', //表单对齐方式
    dialogFormWidth: '850px', //表单弹出层宽度
    dialogSingleFormWidth: '500px', //单列表单弹出层宽度
    dialogPrompt: '500px', //弹出输入框
    dialogFormGutterWidth: 82, //表单列间隔
    dialogDetailWidth: '1000px', //详情弹出层宽度
    dialogMapWidth: '1200px', //地图弹出层宽度
    qiNiuURL: 'http://up-z2.qiniu.com', //七牛上传路径
    // qrUrl: 'http://b.bshare.cn/barCode?site=weixin&url=', //二维码链接
    qrUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=', //二维码链接
    defaultAvatarUrl: "this.src='../../../static/img/default-avatar.png'", //默认头像
    monthPrickValueFormat: 'yyyy-MM', //月选择器的绑定值格式
    yearPrickValueFormat: 'yyyy', //年选择器的绑定值格式
    dayPrickValueFormat: 'yyyy-MM-dd', //日选择器的绑定值格式
    pagination: { //分页器配置
        pageSizes: [5, 10, 15, 20], //每页x条
        size: 10, //每页 x 条数据
        layout: 'total,prev, pager, next, jumper', //配置
        total: 0, //总大小
    },
    //日期选择器配置
    pickerOptions: {
        shortcuts: [{
            text: '最近一周',
            onClick(picker) {
                const end = new Date();
                const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近一个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近三个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
            }
        }]
    },

    //日期选择器类型
    selectDateTypeOptions: [{
            label: '年度数据概览',
            value: 'year'
        },
        {
            label: '月度数据概览',
            value: 'month'
        },
        {
            label: '日度数据概览',
            value: 'date'
        }
    ],

    //星期设置
    weeks: [{
            name: '周一',
            value: 1
        },
        {
            name: '周二',
            value: 2
        },
        {
            name: '周三',
            value: 3
        },
        {
            name: '周四',
            value: 4
        },
        {
            name: '周五',
            value: 5
        },
        {
            name: '周六',
            value: 6
        },
        {
            name: '周日',
            value: 7
        }
    ],

    //月天数
    monthDays: function() {
        let arr = [];
        for (let i = 1; i < 32; i++) {
            arr.push(i + '日');
        }
        return arr;
    },

    //年月份数
    yearMonths: function() {
        let arr = [];
        for (let i = 1; i < 13; i++) {
            arr.push(i + '月');
        }
        return arr;
    },

    //小时数
    hours: function() {
        let arr = [];
        for (let i = 0; i < 24; i++) {
            i < 10 ? arr.push('0' + i + ':00') : arr.push(i + ':00');
        }
        return arr;
    },

    //车牌号键盘
    licenseNumberModels: [`京`, `津,`, `渝`, `冀`, `晋`, `吉`,
        `黒`, `浙`, `皖`, `籟`, `魯`, `豫`, `鄂`, `湘`, `粤`, `珎`, `川`, `貴`, `云`, `陜`, `甘`, `青`, `蒙`, `桂`, `守`, `新`, `藏`, `使`, `領`, `警`, `学`, `港`, `澳`
    ]
};