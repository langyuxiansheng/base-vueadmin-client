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
                            align="center"
                            prop="uid"
                            :show-overflow-tooltip="true"
                            label="用户编号">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="phone"
                            :show-overflow-tooltip="true"
                            label="账号">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            sortable
                            min-width="120"
                            prop="username"
                            :show-overflow-tooltip="true"
                            label="昵称&姓名">
                            <template slot-scope="scope">
                                <span>
                                    {{scope.row.username ? scope.row.username : '-'}}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            sortable
                            min-width="100"
                            prop="iswx"
                            :show-overflow-tooltip="true"
                            label="绑定微信">
                            <template slot-scope="scope">
                                <span>
                                    {{scope.row.isWx ? scope.row.isWx : '-'}}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            sortable
                            min-width="100"
                            prop="amount"
                            :show-overflow-tooltip="true"
                            label="余额(元)">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            min-width="100"
                            sortable
                            prop="countTime"
                            :show-overflow-tooltip="true"
                            label="欠费(元)">
                            <template slot-scope="scope">
                                <span v-if="scope.row.finalFee != undefined && scope.row.totalFee != undefined">
                                    {{(scope.row.finalFee - scope.row.totalFee).toFixed(2)}}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="center">
                            <template slot-scope="scope">
                                <el-button
                                    type="text"
                                    @click="usersOrderParking(scope.row.uid)">
                                    停车记录
                                </el-button>
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

export default {
    name: 'UserInfo',
    data () {
        return {
            tableDataShow: true, //首次进入
            tableData: [],   //表格数据
            tableSearchKeyWord: ''  //搜索关键字
        };
    },

    created () {
        //this.getUserInfo(this);
    },

    watch: {
        $route () {
            this.getUserInfo(this);
            this.tableDataShow = true;
        },

        userInfo (val) {
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
                this.tableData = this.$elTable.init(this.userInfo);
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
        * 用户停车记录
        */
        usersOrderParking (userId) {
            this.$router.push(`/users/userInfo/userParkingOrderList/${userId}`);
        },

        ...mapActions([
            'getUserInfo'
        ])
    },

    computed: {
        ...mapGetters(['config', 'userInfo'])
    }
};
</script>
