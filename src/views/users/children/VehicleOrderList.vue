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
                            min-width="110"
                            align="center"
                            sortable
                            prop="createdTime"
                            :show-overflow-tooltip="true"
                            label="创建时间">
                            <template slot-scope="scope">
                                <span>{{scope.row.createdTime | formatDateYearMonthDayAndHms}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            min-width="110"
                            align="center"
                            sortable
                            prop="licenseNumberIsVerify"
                            :show-overflow-tooltip="true"
                            label="车牌核实">
                            <template slot-scope="scope">
                                <span>{{scope.row.licenseNumberIsVerify | formatLicenseVerifyStatus}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            min-width="100"
                            align="center"
                            prop="licenseNumber"
                            :show-overflow-tooltip="true"
                            label="车牌">
                        </el-table-column>
                        <el-table-column
                            min-width="100"
                            align="center"
                            :show-overflow-tooltip="true"
                            label="图片">
                            <template slot-scope="scope">
                                <img-dialog
                                    v-if="scope.row.images && scope.row.images.length > 0"
                                    :images="scope.row.images">
                                </img-dialog>
                                <span v-else>暂无</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            min-width="110"
                            align="center"
                            prop="orderId"
                            :show-overflow-tooltip="true"
                            label="订单号">
                        </el-table-column>
                        <el-table-column
                            min-width="110"
                            align="center"
                            sortable
                            prop="parkName"
                            :show-overflow-tooltip="true"
                            label="停车场">
                        </el-table-column>
                        <el-table-column
                            min-width="110"
                            align="center"
                            sortable
                            prop="portNumber"
                            :show-overflow-tooltip="true"
                            label="泊位号">
                        </el-table-column>
                        <el-table-column
                            min-width="120"
                            align="center"
                            sortable
                            prop="appointmentStartTime"
                            :show-overflow-tooltip="true"
                            label="预约时间">
                            <template slot-scope="scope">
                                <span>{{scope.row.appointmentStartTime | formatDateYearMonthDayAndHms}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            min-width="120"
                            align="center"
                            sortable
                            prop="parkStartTime"
                            :show-overflow-tooltip="true"
                            label="入场时间">
                            <template slot-scope="scope">
                                <span>{{scope.row.parkStartTime | formatDateYearMonthDayAndHms}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            min-width="120"
                            align="center"
                            sortable
                            prop="countTime"
                            :show-overflow-tooltip="true"
                            label="计费时长">
                            <template slot-scope="scope">
                                <span>{{scope.row.countTime | formatCountTime}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                min-width="120"
                                align="right"
                                sortable
                                prop="finalFee"
                                :show-overflow-tooltip="true"
                                label="订单金额(元)">
                        </el-table-column>
                        <el-table-column
                            min-width="120"
                            align="center"
                            sortable
                            prop="payStatus"
                            :show-overflow-tooltip="true"
                            label="支付情况">
                            <template slot-scope="scope">
                                <span>{{scope.row.payStatus | formatOrderPayStatus}}</span>
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
import ImgDialog from '@/components/ImgDialog/index.vue';

export default {
    name: 'VehicleOrderList',
    data () {
        return {
            isArrears: this.$route.params.isArrears,    //是否欠费
            licenseNumber: this.$route.params.licenseNumber,
            tableDataShow: true, //首次进入
            tableData: [],   //表格数据
            tableSearchKeyWord: ''  //搜索关键字
        };
    },

    created () {
		//获取停车记录列表
        this.getVehicleOrderList(this);
    },

    watch: {
        $route () {
            this.getVehicleOrderList(this);
            this.tableDataShow = true;
        },

        vehicleOrderList (val) {
            if (val && this.tableDataShow) {
                this.tableDataShow = !this.tableDataShow;
                this.tableData = this.$elTable.init(val);
            }
        }
    },

    methods: {

        /**
         * 表格搜索
         * @param keyWord {String} 搜索关键字
         */
        tableSearch (keyWord) {
            if (keyWord.length == 0) {
                this.tableData = this.$elTable.init(this.vehicleOrderList);
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

        ...mapActions([
            'getVehicleOrderList'
        ])
    },

    computed: {
        ...mapGetters(['config', 'vehicleOrderList'])
    },

    comments: {
        ImgDialog
    }
};
</script>
