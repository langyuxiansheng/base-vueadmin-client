<template>
    <div>
        <card-container small>
            <!--表格工具栏-->
            <table-util :utils="{
                    left:[{label:'',slot:''}],
	                right:[{label:'',slot:'search'}],
                }">
                <el-input
                    slot="search"
                    :placeholder="$t('msg.please_input_content')"
                    v-model.trim="tableSearchKeyWord"
                    @keyup.native="tableSearch(tableSearchKeyWord)">
                    <span slot="suffix" class="icon-box" >
                        <i class="el-input__icon el-icon-search"></i>
                        <em>搜索</em>
                    </span>
                </el-input>
            </table-util>
        </card-container>
        <card-container class="rh-table">
            <el-row>
                <el-col :span="24">
                    <el-table
                        :data="tableData"
                        :size="config.tableSize"
                        stripe>
                        <el-table-column
                            align="center"
                            :index="$elTable.propsPage.tableIndex"
                            type="index"
                            :label="$t('label.index_num')">
                        </el-table-column>
                        <el-table-column
                            min-width="100"
                            align="center"
                            sortable
                            prop="licenseNumber"
                            :show-overflow-tooltip="true"
                            label="车牌">
                            <template slot-scope="scope">
                                <span>{{scope.row.licenseNumber}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            min-width="100"
                            align="center"
                            sortable
                            prop="licenseColor"
                            :show-overflow-tooltip="true"
                            label="颜色">
                            <template slot-scope="scope">
                                <span>{{scope.row.licenseColor | formatLicenseColor}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            min-width="100"
                            align="center"
                            sortable
                            prop="parkingCount"
                            :show-overflow-tooltip="true"
                            label="停车次数">
                        </el-table-column>
                        <el-table-column
                            min-width="120"
                            align="center"
                            sortable
                            :show-overflow-tooltip="true"
                            label="欠收金额(元)">
                            <template slot-scope="scope">
                                <span v-if="scope.row.finalFee != undefined && scope.row.totalFee != undefined">
                                    {{(scope.row.finalFee - scope.row.totalFee).toFixed(2)}}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="id"
                            width="320"
                            label="操作"
                            align="center">
                            <template slot-scope="scope">
                                <div class="rh-text-center">
                                    <VehicleDetailDialog :licenseNumber="scope.row.licenseNumber"></VehicleDetailDialog>
                                    <el-button
                                        @click="vehicleOrder(scope.row.licenseNumber)"
                                        type="text">
                                        停车记录
                                    </el-button>
                                    <el-button
                                        @click="vehicleArrearsOrder(scope.row.licenseNumber)"
                                        type="text">
                                        欠费记录
                                    </el-button>
                                    <el-button
                                        @click="historyUsers(scope.row.licenseNumber)"
                                        type="text">
                                        历史使用者
                                    </el-button>
                                    <el-popover
                                        class="margin-left-10"
                                        :title="popoverBtn.title"
                                        placement="top"
                                        width="160"
                                        v-model="scope.row.isShow">
                                        <div class="rh-text-center">
                                            <el-button size="mini" type="text" @click="scope.row.isShow = false">取消</el-button>
                                            <el-button type="primary" size="mini" @click="isAddBlack(scope.row.licenseNumber,1)">确定</el-button>
                                        </div>
                                        <el-button
                                            slot="reference"
                                            type="text">
                                            拉黑
                                        </el-button>
                                    </el-popover>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </card-container>
        <el-pagination
            class="table-pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="$elTable.propsPage.currentPage"
            :page-size="$elTable.propsPage.size"
            :page-sizes="$elTable.propsPage.pageSizes"
            :layout="$elTable.propsPage.layout"
            :total="$elTable.propsPage.total">
        </el-pagination>
    </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters, mapActions} from 'vuex';
import VehicleDetailDialog from './children/VehicleDetailDialog.vue';

export default {
    name: 'VehicleInfo',
    data () {
        return {
            tableDataShow: true, //首次进入
            tableData: [],   //表格数据
            tableSearchKeyWord: '',  //搜索关键字

            popoverBtn: {
                title: '您确定拉黑此车辆吗？',
                isShow: false
            },

            //拉黑车辆
            addBlackData: {
                blackType: '2',
                blackList: []
            }
        };
    },

    created () {
        //this.getVehicleInfo(this);
    },

    watch: {
        $route () {
            this.getVehicleInfo(this);
            this.tableDataShow = true;
        },

        vehicleInfo (val) {
            if (val && this.tableDataShow) {
                this.tableDataShow = !this.tableDataShow;
                this.tableData = this.$elTable.init(val);
            }
        }
    },

    methods: {

        /**
         * 表格搜索
         */
        tableSearch (keyWord) {
            if (keyWord.length == 0) {
                this.tableData = this.$elTable.init(this.vehicleInfo);
            } else {
                this.tableData = this.$elTable.tableSearch(keyWord);
            }
        },

        /**
         * 每页大小
         */
        handleSizeChange (val) {
            this.tableData = this.$elTable.tablePagination({
                sizeChange: val
            });
        },

       /**
        * 翻页
        */
        handleCurrentChange (val) {
            this.tableData = this.$elTable.tablePagination({
                currentChange: val
            });
        },

       /**
        * 车辆停车记录
        */
        vehicleOrder (licenseNumber) {
            this.$router.push(`/users/vehicle/vehicleOrderList/${licenseNumber}`);
        },

        /**
         * 车辆欠费记录
         */
        vehicleArrearsOrder (licenseNumber) {
            this.$router.push(`/users/vehicle/vehicleArrearsOrderList/${licenseNumber}/1`);
        },

        /**
         * 历史使用者
         */
        historyUsers (licenseNumber) {
            this.$router.push(`/users/vehicle/vehicleHistoryUsersList/${licenseNumber}`);
        },
        //

        /**
         * 拉黑车辆
         */
        isAddBlack (licenseNumber) {
            this.tableDataShow = true;
            this.addBlackData.blackList = [];
            this.addBlackData.blackList.push(licenseNumber);
            this.addVehicleToBlackList(this);
        },

        ...mapActions([
            'getVehicleInfo',
            'addVehicleToBlackList'
        ])
    },

    computed: {
        ...mapGetters(['config', 'vehicleInfo'])
    },

    components: {
        VehicleDetailDialog
    }
};
</script>
