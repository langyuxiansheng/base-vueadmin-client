<template>
    <div>
        <card-container small>
            <!--表格工具栏-->
            <table-util :utils="{
                    left:[{label:'',slot:'add'},{label:'',slot:'thisDownload'},{label:'',slot:'allDownload'}],
	                right:[{label:'',slot:'search'}],
                }">
                <el-button slot="add" icon="el-icon-plus"  @click="showDialog()">开卡</el-button>
                <el-button slot="thisDownload" icon="el-icon-download" @click="excelThisDownload" plain>导出单页</el-button>
                <el-button slot="allDownload" icon="el-icon-download" @click="excelAllDownload" plain>导出全部</el-button>
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
                            prop="licenseNumber"
                            :show-overflow-tooltip="true"
                            label="车牌">
                        </el-table-column>
                        <el-table-column
                            min-width="100"
                            align="center"
                            prop="chargeType"
                            :show-overflow-tooltip="true"
                            label="卡类型"
                            sortable>
                            <template slot-scope="scope">
                                <span>{{scope.row.chargeType | formatChargeType}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            min-width="100"
                            align="center"
                            prop="phone"
                            :show-overflow-tooltip="true"
                            label="联系电话">
                            <template slot-scope="scope">
                                <span>{{scope.row.phone ? scope.row.phone : '-'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            min-width="100"
                            align="center"
                            prop="parkName"
                            :show-overflow-tooltip="true"
                            label="适用车场">
                        </el-table-column>
                        <el-table-column
                            min-width="120"
                            align="center"
                            prop="createdTime"
                            :show-overflow-tooltip="true"
                            label="初次开卡时间"
                            sortable>
                            <template slot-scope="scope">
                                <span>{{scope.row.createdTime | formatDateYearMonthDayAndHms}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            min-width="100"
                            align="center"
                            prop="effectiveStartTime"
                            :show-overflow-tooltip="true"
                            label="生效时间">
                            <template slot-scope="scope">
                                <span>{{scope.row.effectiveStartTime | formatDateYearMonthDayAndHms}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            min-width="100"
                            align="center"
                            prop="effectiveEndTime"
                            :show-overflow-tooltip="true"
                            label="失效时间"
                            sortable>
                            <template slot-scope="scope">
                                <span>{{scope.row.effectiveEndTime | formatDateYearMonthDayAndHms}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            min-width="100"
                            align="center"
                            prop="effective"
                            :show-overflow-tooltip="true"
                            label="剩余天数"
                            sortable>
                        </el-table-column>
                        <el-table-column
                            min-width="120"
                            align="center"
                            prop="payAmount"
                            :show-overflow-tooltip="true"
                            label="卡费(元)"
                            sortable>
                        </el-table-column>
                        <el-table-column
                            min-width="100"
                            align="center"
                            prop="payStatus"
                            :show-overflow-tooltip="true"
                            label="备注">
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            min-width="150"
                            align="center">
                            <template slot-scope="scope">
                                <div class="rh-text-center">
                                    <el-button
                                        type="text"
                                        @click="showRechargeDialog(scope.row)">
                                        续费
                                    </el-button>
                                    <el-button
                                        type="text"
                                        @click="showDialog(scope.row)">
                                        编辑
                                    </el-button>
                                    <el-popover
                                        class="remove-button"
                                        :title="titleOne"
                                        placement="top"
                                        width="160"
                                        v-model="scope.row.isShow">
                                        <div class="rh-text-center">
                                            <el-button size="mini" type="text" @click="scope.row.isShow = false">取消</el-button>
                                            <el-button type="primary" size="mini" @click="isRemoveCard(scope.row)">确定</el-button>
                                        </div>
                                        <el-button type="text" slot="reference">移除</el-button>
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

        <!--新增/修改月卡模态框-->
        <el-dialog
            :width="config.dialogFormWidth"
            custom-class="rh-dialog"
            :center="formDialog.center"
            :visible.sync="formDialog.isShow">
            <span class="dialog-title" slot="title">
                {{formDialog.title}}
            </span>
            <AddOrUpdateMonthCard ref="AddOrUpdateMonthCard" @refresh="refreshList"></AddOrUpdateMonthCard>
        </el-dialog>

        <!--续费月卡模态框-->
        <el-dialog
            :width="config.dialogPrompt"
            custom-class="rh-dialog"
            :center="rechargeDialog.center"
            :visible.sync="rechargeDialog.isShow">
            <span class="dialog-title" slot="title">
                {{rechargeDialog.title}}
            </span>
            <RechargeMonthCard ref="RechargeMonthCard" @refresh="refreshList"></RechargeMonthCard>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
import {mapGetters, mapActions} from 'vuex';
import util from '@/common/method/util';
import AddOrUpdateMonthCard from '../form/AddOrUpdateMonthCard.vue';
import RechargeMonthCard from '../form/RechargeMonthCard.vue';

export default {
    name: 'MonthCardManagement',
    data () {
        const {parkId} = this.$route.params;

        return {
            parkId: parkId,
            tableDataShow: true, //首次进入
            tableData: [],   //表格数据
            tableSearchKeyWord: '',  //搜索关键字

            //导出数据配置
            exportExcel: {
	            exportData: [],
	            tHeader: ['车牌', '卡类型', '联系电话', '适用车场', '初次开卡时间', '生效时间', '失效时间', '卡期', '卡费(元)', '备注'],
	            filterVal: ['licenseNumber', 'chargeType', 'phone', 'parkName', 'createdTime', 'effectiveStartTime', 'effectiveEndTime', 'manyMonth', 'payAmount', ''],
	            fileName: '月卡列表' + util.getThisTime()
            },

            titleOne: '您确定移除此月卡吗？',
            isShow: false,

            //模态框
            formDialog: {
                title: '开通月卡',
                center: true,
                isShow: false
            },

            //续费
            rechargeDialog: {
                title: '续费月卡',
                center: true,
                isShow: false
            },

            //移除月卡
            deleteCardData: {
	            parkId: parkId,   //车场id
	            licenseNumber: null //车牌号
            }
        };
    },

    created () {
        this.getMonthCardList(this);
    },

    watch: {
        $route () {
            this.getMonthCardList(this);
            this.tableDataShow = true;
        },

        monthCardList (val) {
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
                this.tableData = this.$elTable.init(this.monthCardList);
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
         * 导出单页
         */
        excelThisDownload () {
            this.exportExcel.exportData = this.formatJson(this.tableData);
            this.$elTable.exportAllExcel(this.exportExcel);
        },

        /**
         * 导出全部
         */
        excelAllDownload () {
            this.exportExcel.exportData = this.formatJson(this.monthCardList);
            this.$elTable.exportAllExcel(this.exportExcel);
        },

        /**
         * 导出过滤器
         */
        formatJson (jsonData) {
            let list = jsonData;
            let filterVal = this.exportExcel.filterVal;
            if (list && list.length > 0 && filterVal && filterVal.length > 0) {
                return list.map(v => filterVal.map(j => {
                    switch (j) {
                    case 'chargeType':
                        return this.$rhFilters.formatChargeType(v[j]);
                    case 'createdTime':
                    case 'effectiveStartTime':
                    case 'effectiveEndTime':
                        return this.$rhFilters.formatDateYearMonthDayAndHms(v[j]);
                    default :
                        return v[j] ? String(v[j]) : '-';
                    }
                }));
            }
            return list;
        },

        /**
         * 添加/修改月卡
         */
        showDialog (row) {
            this.tableDataShow = true;
            this.formDialog.isShow = true;
            this.$nextTick(() => {
                if (row && row.monthCardId) {
                    this.formDialog.title = '编辑月卡';
                    this.$refs.AddOrUpdateMonthCard.init(row);
                } else {
                    this.formDialog.title = '开通月卡';
                    this.$refs.AddOrUpdateMonthCard.init({parkId: this.parkId});
                }
            });
        },

        /**
         * 续费月卡
         */
        showRechargeDialog (row) {
            this.tableDataShow = true;
            this.rechargeDialog.isShow = true;
            this.$nextTick(() => {
                this.$refs.RechargeMonthCard.init(row);
            });
        },

        /**
         * 刷新列表
         */
        refreshList () {
            this.getMonthCardList(this);
            this.formDialog.isShow = false;
            this.rechargeDialog.isShow = false;
        },

        /**
         * 移除月卡
         */
        isRemoveCard (row) {
            this.tableDataShow = true;
            this.deleteCardData.licenseNumber = row.licenseNumber;
            this.checkPasswordPrompt('remove');
        },

        /**
	     * 密码确认输入框
	     */
        checkPasswordPrompt (type) {
            this.$prompt('请输入登录密码', '安全验证', {
                center: true,
                inputType: 'password',
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^[^\s]+$/,
                inputErrorMessage: '密码不能为空',
                closeOnHashChange: false,
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        this.checkPasswordValue = instance.inputValue;
                        this.done = done;
                        this.checkPasswordPromptType = type;
                        this.checkPassword(this);
                    } else {
                        done();
                    }
                }
            }).then(({ value }) => {
                this.tableDataShow = true;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            });
        },

        /**
	     * 二次验证回调函数
	     */
        checkPasswordCallback (type) {
            this.deleteMonthCard(this);
        },

        ...mapActions([
            'getMonthCardList',
            'checkPassword',
            'deleteMonthCard'
        ])
    },

    computed: {
        ...mapGetters([
            'config',
            'monthCardList'
        ])
    },

    components: {
        AddOrUpdateMonthCard,
        RechargeMonthCard
    }
};
</script>
<style lang="less" scoped>
    .remove-button{
        margin-left: 10px
    }
</style>

