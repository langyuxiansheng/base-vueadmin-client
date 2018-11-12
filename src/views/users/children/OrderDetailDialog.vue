<template>
    <span class="detail-btn">
        <el-button type="text" @click="showDialog()">
            订单详情
        </el-button>
            <!--图片显示模态框-->
        <el-dialog
            v-if="detailDialog.isShow"
            custom-class="rh-dialog"
            :width="config.dialogDetailWidth"
            :center="detailDialog.center"
            :visible.sync="detailDialog.isShow">
            <div class="order-detail" v-if="orderDetail">
                <el-row class="order-detail-header" :gutter="130">
                    <el-col :span="12">
                        <h1 class="order-detail-title">订单编号：{{orderDetail.orderId}}</h1>
                    </el-col>
                    <el-col :span="12">
                        <h1 class="order-detail-title">{{orderDetail.uid}}</h1>
                    </el-col>
                </el-row>
                <div class="park-detail">
                    <span class="item">{{orderDetail.parkName}}</span>
                    <span class="item">泊位号：{{orderDetail.portNumber}} </span>
                    <span class="item"> 编码：{{orderDetail.portId}}</span>
                </div>
                <div class="park-detail">
                    <span class="item">{{orderDetail.licenseNumber}}</span>
                    <span class="item">{{orderDetail.orderType === 1 ? '线上预约' :'线下单'}}</span>
                </div>
                <el-row class="order-detail-body" :gutter="130">
                    <el-col :span="12">
                        <div class="item-row">
                            <span class="name">预约时间：</span>
                            <span>{{orderDetail.appointmentStartTime | formatDateYearMonthDayAndHms}}</span>
                        </div>
                        <div class="item-row">
                            <span class="name">计费时间：</span>
                            <span>{{orderDetail.parkStartTime | formatDateYearMonthDayAndHms}}</span>
                        </div>
                        <div class="item-row">
                            <span class="name">驶入时间：</span>
                            <span v-if="orderDetail.hardOrder">{{orderDetail.hardOrder.beginTime | formatDateYearMonthDayAndHms}}</span>
                        </div>
                        <div class="item-row">
                            <span class="name">结束时间：</span>
                            <span>{{orderDetail.parkEndTime | formatDateYearMonthDayAndHms}}</span>
                        </div>
                        <div class="item-row">
                            <span class="name">驶出时间：</span>
                            <span v-if="orderDetail.hardOrder">{{orderDetail.hardOrder.endTime | formatDateYearMonthDayAndHms}}</span>
                        </div>
                        <div class="item-row">
                            <span class="name">计费时长：</span>
                            <span>{{orderDetail.countTime | formatCountTime}}</span>
                        </div>
                        <div class="item-row">
                            <span class="name">产生费用：</span>
                            <span>{{orderDetail.finalFee}}元</span>
                            <span class="status-tag">{{orderDetail.payStatus | formatOrderPayStatus}}</span>
                        </div>
                        <div class="item-row charge-standard">
                            <span class="name">计费标准</span>
                            <div class="charge-standard-content" v-if="orderDetail.structure" v-for="(item,k) in orderDetail.structure" :key="k">
                                <h1 class="charge-title">时段{{k+1}}</h1>
                                <div class="charge-item-row">
                                    <span>开放时段：{{item.startTime}}-{{item.endTime}}</span>
                                </div>
                                <div class="charge-item-row">
                                    <span>起价： {{item.startFee}}元/{{item.startTimeDur}}小时</span>
                                </div>
                                <div class="charge-item-row">
                                    <span>之后： {{item.fee}}元/1小时</span>
                                </div>
                                <div class="charge-item-row" v>
                                    <span>执行：</span>
                                    <span class="week-tag" v-for="(v,i) in item.dateRange" :key="i">
                                        {{weeks[v - 1]}}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="item-row" v-for="(item,i) in orderDetail.orderTypeList" :key="i">
                            <span class="name">{{item.payType | formatPayType}}：</span>
                            <span>{{item.money}} 元</span>
                        </div>
                        <!-- <div class="item-row">
                            <span class="name">找补金额：</span>
                            <span>0元</span>
                        </div>
                        <div class="item-row">
                            <span class="name">支付人：</span>
                            <span></span>
                        </div>
                        <div class="item-row">
                            <span class="name">余额抵扣：</span>
                            <span>0元</span>
                        </div>
                        <div class="item-row">
                            <span class="name">卡券抵扣：</span>
                            <span>0元</span>
                        </div>
                        <div class="item-row">
                            <span class="name">退款金额：</span>
                            <span>0元</span>
                        </div> -->
                        <div class="item-row">
                            <span class="name">完成支付时间：</span>
                            <span>{{orderDetail.endTime | formatDateYearMonthDayAndHms}}</span>
                        </div>
                        <div class="item-row">
                            <span class="name">核实管理员：</span>
                            <span>{{orderDetail.workManName}}</span>
                        </div>
                        <div class="item-row">
                            <span class="name">当班值守员：</span>
                            <span>{{orderDetail.currentManagerName}}</span>
                        </div>
                        <div class="item-row">
                            <span class="name">核收人：</span>
                            <span>{{orderDetail.endManName ? endManName : '系统'}}</span>
                        </div>
                        <div class="item-row">
                            <span class="name">取证图片：</span>
                            <div class="imgs-container">
                                <img v-image-preview class="img" v-for="(v,k) in orderDetail.imgs" :src="v" alt="" :key="k"/>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-dialog>
    </span>
</template>
<script type="text/ecmascript-6">
import {mapGetters, mapActions} from 'vuex';

export default {
    name: 'OrderDetailDialog',
    data () {
        return {
            detailDialog: {
                isShow: false,
                center: true,
                title: '订单详情'
            },
            weeks: [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ]
        };
    },

    props: {
        orderId: Number
    },

    methods: {
        showDialog () {
            this.detailDialog.isShow = true;
            this.getOrderDetail(this);
        },
        ...mapActions([
            'getOrderDetail'
        ])
    },

    computed: {
        ...mapGetters(['config', 'orderDetail'])
    }
};
</script>
<style lang="less" scoped>
    .detail-btn{
        margin-right: 10px;
    }
    .order-detail{
        padding: 0 70px;
        color: #101215;
        font-size: 14px;
        .order-detail-header{
            padding: 26px 0;
            border-bottom: 1px solid #E0E7F5;
            margin-bottom: 30px;
        }
        .park-detail{
            margin-bottom: 30px;
            .item{
                margin-right: 30px;
            }
        }
        .order-detail-body{
            .item-row{
                margin-bottom: 26px;
                .name{
                    color: #9EA1A5;
                }
                .imgs-container{
                    margin-top: 20px;
                    .img{
                        display: inline-block;
                        margin-right: 10px;
                        max-width: 46px;
                        height: auto;
                        cursor: pointer;
                    }
                }
                //默认 已支付 免费
                .status-tag{
                    display: inline-block;
                    color: #fff;
                    background-color: #12D540;
                    border-radius: 5px;
                    font-size: 12px;
                    padding:0 5px;
                    margin-left: 5px;
                }
                //未支付  欠款
                .status-tag-orange{
                    background-color: #FE8A73;
                }
                //待上缴 已退款
                .status-tag-blue{
                    background-color: #4777E6;
                }

                //收费标准
                .charge-standard-content{
                    margin-top: 20px;
                    border: 1px solid #E0E7F5;
                    border-radius: 10px;
                    padding: 12px 28px;
                    .charge-title{
                        font-size: 16px;
                        margin-bottom: 16px;
                    }
                    .charge-item-row{
                        margin-bottom: 12px;
                        .week-tag{
                            margin-right: 2px;
                        }
                    }
                }
            }
        }
    }
</style>
