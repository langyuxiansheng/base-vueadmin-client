<template>
    <span class="detail-btn">
        <el-button type="text" @click="showDialog()">
            车辆详情
        </el-button>
            <!--图片显示模态框-->
        <el-dialog
            v-if="detailDialog.isShow"
            custom-class="rh-dialog"
            :width="config.dialogDetailWidth"
            :center="detailDialog.center"
            :visible.sync="detailDialog.isShow">
            <span slot="title"> {{detailDialog.title}} </span>
            <div class="park-detail" v-if="vehicleDetail">
                <el-row>
                    <el-col :span="10">
                        <div class="detail-row">
                            <span class="name">车牌:</span>
                                <span class="content">
                                {{vehicleDetail.licenseNumber}}
                                <el-tag size="small" type="info">{{ vehicleDetail.licenseNumberColor | formatLicenseColor}}</el-tag>
                            </span>
                        </div>
                        <div class="detail-row">
                            <span class="name">新能源车:</span>
                            <span class="content">未知</span>
                        </div>
                        <div class="detail-row">
                            <span class="name">车辆类型:</span>
                            <span class="content">未知</span>
                        </div>
                        <div class="detail-row">
                            <span class="name">住址:</span>
                            <span class="content">未知</span>
                        </div>
                        <div class="detail-row">
                            <span class="name">品牌型号:</span>
                                <span class="content" v-if="vehicleDetail.vehicle && vehicleDetail.vehicle.model">
                                {{vehicleDetail.vehicle.model}}
                            </span>
                            <span v-else>未知</span>
                        </div>
                        <div class="detail-row">
                            <span class="name">车俩识别号:</span>
                                <span class="content" v-if="vehicleDetail.vehicle && vehicleDetail.vehicle.vin">
                                {{vehicleDetail.vehicle.vin}}
                            </span>
                            <span v-else>未知</span>
                        </div>
                        <div class="detail-row">
                            <span class="name">发动机号码:</span>
                            <span class="content" v-if="vehicleDetail.vehicle && vehicleDetail.vehicle.engineNo">
                                {{vehicleDetail.vehicle.engineNo}}
                            </span>
                            <span v-else>未知</span>
                        </div>
                    </el-col>
                    <el-col :offset="2" :span="12">
                        <div class="detail-row">
                            <span class="name">认证状态:</span>
                            <span class="content">{{vehicleDetail.verifyType | verifyType}}</span>
                        </div>
                        <div class="detail-row">
                            <span class="name">车主:</span>
                                <span class="content" v-if="vehicleDetail.vehicle && vehicleDetail.vehicle.owner">
                                {{vehicleDetail.vehicle.owner}}
                            </span>
                            <span v-else>未知</span>
                        </div>
                        <div class="detail-row">
                            <span class="name">联系方式:</span>
                                <span class="content">未知</span>
                            </div>
                        <div class="img-list" v-if="vehicleDetail.vehicle && vehicleDetail.vehicle.licenseImg">
                            <img v-image-preview :src="vehicleDetail.vehicle.licenseImg" alt="行驶证图片">
                        </div>
                        <div v-else> 未知 </div>
                    </el-col>
                </el-row>
            </div>
            <div class="rh-text-center">暂无详情信息</div>
        </el-dialog>
    </span>
</template>
<script type="text/ecmascript-6">
import {mapGetters, mapActions} from 'vuex';

export default {
    name: 'VehicleDetailDialog',
    data () {
        return {
            detailDialog: {
                isShow: false,
                center: true,
                title: '车辆详情'
            }
        };
    },

    props: {
        licenseNumber: String
    },

    methods: {
        showDialog () {
            this.detailDialog.isShow = true;
            this.getVehicleDetail(this);
        },

        ...mapActions([
            'getVehicleDetail'
        ])
    },

    computed: {
        ...mapGetters(['config', 'vehicleDetail'])
    }
};
</script>
<style lang="less" scoped>
    .detail-btn{
        margin-right: 10px;
    }
    .park-detail{
        & .dialog-title{
            font-size: 18px;
            font-weight: bold;
        }

        & .detail-row{
            font-size: 16px;
            position: relative;
            padding: 10px 0;
            overflow: hidden;
            zoom: 1;
            .name{
                font-weight: bold;
                margin-right: 10px;
                float: left;
                display: block;
            }
            .content{
                float: right;
                text-align: left;
                display: block;
                width: 74%;
                max-height: 350px;
                overflow: auto;
                .fee-time {
                    font-size: 14px;
                    margin-bottom: 10px;
                    .fee-row{
                        .fee-title{
                            display: block;
                            float: left;
                        }
                        .fee-content{
                            display: block;
                            float: right;
                            width: 250px;
                            text-align: left;
                        }
                        .week-tag{
                            margin: 2px 4px 4px 0;
                        }
                    }
                }

                .qr-img{
                    display: inline-block;
                    vertical-align: middle;
                }

                .park-imgs{
                    display: inline-block;
                    img{
                        width: 108px;
                        margin: 4px;
                        vertical-align: top;
                    }
                }
            }
        }
    }
</style>
