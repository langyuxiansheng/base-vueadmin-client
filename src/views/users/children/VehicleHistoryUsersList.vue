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
                            prop="phone"
                            :show-overflow-tooltip="true"
                            label="账号">
                            <template slot-scope="scope">
                                <span>{{scope.row.phone ? scope.row.phone : '-'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            sortable
                            prop="verifyType"
                            :show-overflow-tooltip="true"
                            label="是否认证">
                            <template slot-scope="scope">
                                <span>{{scope.row.verifyType | verifyType}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            sortable
                            prop="isDefault"
                            :show-overflow-tooltip="true"
                            label="是否常用">
                            <template slot-scope="scope">
                                <span v-if="scope.row.isDefault !=undefined">{{scope.row.isDefault ? '常用':'不常用'}}</span>
                                <span v-else>-</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            sortable
                            prop="count"
                            :show-overflow-tooltip="true"
                            label="停车次数">
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
    name: 'VehicleHistoryUsersList',
    data () {
        return {
            licenseNumber: this.$route.params.licenseNumber,
            tableDataShow: true, //首次进入
            tableData: [],   //表格数据
            tableSearchKeyWord: ''  //搜索关键字
        };
    },

    created () {
        this.getVehicleHistoryUsersList(this);
    },

    watch: {
        $route () {
            this.getVehicleHistoryUsersList(this);
            this.tableDataShow = true;
        },

        vehicleHistoryUsersList (val) {
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
                this.tableData = this.$elTable.init(this.vehicleHistoryUsersList);
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
            'getVehicleHistoryUsersList'
        ])
    },

    computed: {
        ...mapGetters(['config', 'vehicleHistoryUsersList'])
    }
};
</script>
