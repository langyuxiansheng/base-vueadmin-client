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
                            align="center"
                            prop="orderId"
                            :show-overflow-tooltip="true"
                            label="订单号">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            sortable
                            min-width="100"
                            prop="name"
                            :show-overflow-tooltip="true"
                            label="订单类型">
                            <template slot-scope="scope">
                                <div v-if="scope.row.orderType == 1">
                                    <span>线上订单</span>
                                </div>
                                <div v-else>
                                    <span>
                                        {{scope.row.isEmergency ? '应急订单':'辅助停车'}}
                                    </span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            min-width="100"
                            sortable
                            prop="parkName"
                            :show-overflow-tooltip="true"
                            label="车场">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            min-width="100"
                            sortable
                            prop="portNumber"
                            :show-overflow-tooltip="true"
                            label="泊位号">
                        </el-table-column>
                        <el-table-column
                            min-width="100"
                            align="center"
                            prop="licenseNumber"
                            :show-overflow-tooltip="true"
                            label="车牌">
                            <template slot-scope="scope">
                                <span>{{scope.row.licenseNumber ? scope.row.licenseNumber : '-'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            min-width="100"
                            sortable
                            prop="status"
                            :show-overflow-tooltip="true"
                            label="订单状态">
                            <template slot-scope="scope">
                                <span>{{scope.row.status | formatOrderStatus}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            sortable
                            min-width="100"
                            prop="countTime"
                            :show-overflow-tooltip="true"
                            label="计费时长">
                            <template slot-scope="scope">
                                <span>{{scope.row.countTime | formatCountTime}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="right"
                            min-width="120"
                            sortable
                            prop="finalFee"
                            :show-overflow-tooltip="true"
                            label="订单金额(￥)">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            min-width="100"
                            sortable
                            prop="payStatus"
                            :show-overflow-tooltip="true"
                            label="收费状态">
                             <template slot-scope="scope">
                                <span>{{scope.row.payStatus | formatOrderPayStatus}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="center">
                            <template slot-scope="scope">
                                <div class="rh-text-center">
                                    <OrderDetailDialog :orderId="scope.row.orderId"></OrderDetailDialog>
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
import OrderDetailDialog from './OrderDetailDialog.vue';

export default {
    name: 'UserParkingOrderList',
    data () {
        return {
            userId: this.$route.params.userId,
            tableDataShow: true, //首次进入
            tableData: [],   //表格数据
            tableSearchKeyWord: ''  //搜索关键字
        };
    },

    created () {
		//获取停车记录列表
        this.getUserParkingOrderList(this);
    },

    watch: {
        $route () {
            this.getUserParkingOrderList(this);
            this.tableDataShow = true;
        },

        userParkingOrderList (val) {
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
                this.tableData = this.$elTable.init(this.userParkingOrderList);
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
            'getUserParkingOrderList'
        ])
    },

    computed: {
        ...mapGetters(['config', 'userParkingOrderList'])
    },

    components: {
        OrderDetailDialog
    }
};
</script>
