<template>
    <div>
        <TableUtilContainer :utils="{
            left:[{label:'',slot:'add'}],
            right:[{label:'',slot:'search'}],
        }">
            <el-button slot="add" type="primary" icon="el-icon-plus" plain @click="showDialog ({type:'add'})">添加</el-button>
        </TableUtilContainer>
        <el-table :data="table.data" stripe>
            <el-table-column align="center" type="index" :label="$t('label.index_num')">
            </el-table-column>
            <el-table-column v-for="(col,k) in tableCols" :key="k" :show-overflow-tooltip="col.key !== 'operation'" :align="col.align || 'center'" :width="col.width" :label="col.label">
                <template slot-scope="scope">
                    <span v-if="col.key === 'operation' && scope.row.IsAdmin !== 1">
                        <el-button type="warning" @click="resetPwd (scope.row.demoId) ">重置密码</el-button>
                        <el-button type="warning" @click="showDialog({type:'update',data:scope.row})">编辑</el-button>
                        <el-button type="danger" @click="handleDel(scope.row.demoId)">删除</el-button>
                        <el-dropdown class="margin-left-10" @command="handleCommand">
                            <el-button type="primary">
                                更多操作<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item :command="{type:'payAgent',data:scope.row}">加数据</el-dropdown-item>
                                <el-dropdown-item :command="{type:'drawAgent',data:scope.row}">减数据</el-dropdown-item>
                                <el-dropdown-item :command="{type:'status',data:scope.row}">修改状态</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </span>
                    <span v-else-if="col.key === 'detail'">
                        <el-tooltip content="点击查看API" placement="bottom" effect="light">
                            <el-button @click=" showDialog ({ type:'showAPI', data:scope.row })" type="text">{{ scope.row[col.key]}}</el-button>
                        </el-tooltip>
                    </span>
                    <span v-else-if="col.key === 'demoName'">
                        <el-tooltip content="点击查看详情" placement="bottom" effect="light">
                            <el-button @click=" showDialog ({ type:'detail', data:scope.row })" type="text">{{ scope.row[col.key] || '外星用户'}}</el-button>
                        </el-tooltip>
                    </span>
                    <span v-else-if="col.key === 'status'">
                           {{ scope.row[col.key] ? '正常' : '异常'}}
                    </span>
                    <span v-else-if="col.key === 'createdTime'">
                        {{ scope.row[col.key] | formatDateYearMonthDayAndHms}}
                    </span>
                    <span v-else>{{scope.row[col.key]}}</span>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="table-pagination" @current-change="handleCurrentChange" :page-size="$store.state.config.pagination.size" :page-sizes="$store.state.config.pagination.pageSizes" :layout="$store.state.config.pagination.layout" :total="table.total">
        </el-pagination>
        <BigDemoFormDialog ref="BigDemoFormDialog" @refresh="init()" />
        <SmallDemoFormDialog ref="SmallDemoFormDialog" @refresh="init()" />
        <BigDemoDetailDialog ref="BigDemoDetailDialog"/>
        <SmallDemoDetailDialog ref="SmallDemoDetailDialog"/>
    </div>
</template>

<script>
import util from '@/common/method/util';
import { getListDemo, updateDemo, deleteDemo } from '@/http';
import BigDemoFormDialog from './form/BigDemoFormDialog';
import SmallDemoFormDialog from './form/SmallDemoFormDialog';
import BigDemoDetailDialog from './dialog/BigDemoDetailDialog';
import SmallDemoDetailDialog from './dialog/SmallDemoDetailDialog';
export default {
    name: 'ListDemo',
    components: {
        BigDemoFormDialog,
        SmallDemoFormDialog,
        BigDemoDetailDialog,
        SmallDemoDetailDialog
    },
    data () {
        return {
            table: {
                queryData: {
                    keyWord: null, //搜索关键字
                    GetID: 0,
                    Total: false,
                    page: 1,
                    limit: 10
                },
                data: [],
                total: 0
            },

            tableCols: [
                {
                    key: 'demoId',
                    label: 'demo编号'
                },
                {
                    key: 'demoName',
                    label: '昵称'
                },
                {
                    key: 'status',
                    label: '状态'
                },
                {
                    key: 'createdTime',
                    label: '创建时间'
                },
                {
                    key: 'operation',
                    label: '操作',
                    width: '350px'
                }
            ]
        };
    },
    created () {
        this.init();
    },
    methods: {

        async init () {
            const { data, total } = await getListDemo(this.table.queryData);
            this.table.data = data;
            this.table.total = total;
        },

        /**
         * 表格搜索
         */
        tableSearch () {

        },

        /**
        * 翻页
        */
        handleCurrentChange (val) {
            this.table.queryData.page = val;
            this.init();
        },

        /**
	     * 弹出层操作
	     */
        showDialog ({ type, data }) {
            const cloneData = util.deepCloneObject(data);
            if (type === 'add') {
                this.$refs.BigDemoFormDialog.init({ type, title: '添加' });
            } else if (type === 'update') {
                this.$refs.BigDemoFormDialog.init({ type, title: '编辑', data: cloneData });
            } else if (type === 'detail') {
                this.$refs.BigDemoDetailDialog.init({ type, title: '详情', data: cloneData });
            } else if (type === 'showAPI') {
                this.$refs.SmallDemoDetailDialog.init({ type, title: '查看', data: cloneData });
            } else if (type === 'add+') {
                this.$refs.SmallDemoFormDialog.init({ type, title: '加上', data: cloneData });
            } else if (type === 'remove') {
                this.$refs.SmallDemoFormDialog.init({ type, title: '减少', data: cloneData });
            }
        },

        /**
         * 重置代理密码
         */
        resetPwd (demoId) {
            this.$confirm('此操作将重置该账号的密码为默认密码, 是否继续?', '敏感操作提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true,
                type: 'warning'
            }).then(async () => {
                const { code } = await updateDemo({demoId, newPassword: '123456'});
                if (code === 200) {
                    this.$message.success(this.$t('msg.operation_success'));
                    this.init();
                }
            });
        },

        /**
         * 下来菜单回调
         */
        handleCommand({type, data}) {
            switch (type) {
            case 'payAgent':
                this.showDialog({ type, data }); break;
            case 'drawAgent':
                this.showDialog({ type, data }); break;
            case 'status':
                this.updateAgentStatus(data); break;
            }
        },

        /**
         * 注销
         */
        handleDel (demoId) {
            this.$confirm('此操作将注销该数据, 是否继续?', '敏感操作提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true,
                type: 'warning'
            }).then(async () => {
                const { code } = await deleteDemo(demoId);
                if (code === 200) {
                    this.$message.success(this.$t('msg.remove_success'));
                    this.init();
                }
            });
        }
    }
};
</script>
