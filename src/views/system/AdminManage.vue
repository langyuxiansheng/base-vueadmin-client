<template>
    <div>
        <TableUtilContainer :utils="{
            left:[{label:'',slot:'add'}],
            right:[{label:'',slot:'search'}],
        }">
            <el-button slot="add" type="primary" icon="el-icon-plus" plain @click="showDialog ({type:'add'})">添加管理员</el-button>
        </TableUtilContainer>
        <el-table :data="table.data" stripe>
            <el-table-column align="center" type="index" :label="$t('label.index_num')">
            </el-table-column>
            <el-table-column v-for="(col,k) in tableCols" :key="k" :show-overflow-tooltip="col.key !== 'operation'" :align="col.align || 'center'" :width="col.width" :label="col.label">
                <template slot-scope="scope">
                    <span v-if="col.key === 'operation'">
                        <el-button type="primary">设置角色</el-button>
                        <el-button type="warning">重置密码</el-button>
                        <el-button v-if="scope.row.Status" type="warning" @click="updateAdmin(scope.row.AdminID,0)">启用</el-button>
                        <el-button v-else type="warning" @click="updateAdmin(scope.row.AdminID,1)">禁用</el-button>
                        <el-button type="danger" @click="delAdmin(scope.row.AdminID)">注销</el-button>
                    </span>
                    <span v-if="col.key === 'RoleName'">
                        {{scope.row.IsAdmin ? '超级管理员': scope.row[col.key]}}
                    </span>
                    <span v-else>{{scope.row[col.key]}}</span>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="table-pagination" @current-change="handleCurrentChange" :page-size="$store.state.config.pagination.size" :page-sizes="$store.state.config.pagination.pageSizes" :layout="$store.state.config.pagination.layout" :total="table.total">
        </el-pagination>
        <AdminFormDialog ref="AdminFormDialog" @refresh="init()" />
    </div>
</template>

<script>
import { getPlatformAdminList, updatePlatformAdmin, delPlatformAdmin } from '@/http';
import AdminFormDialog from './form/AdminFormDialog';
export default {
    name: 'AdminManage',
    components: {
        AdminFormDialog
    },
    data () {
        return {
            table: {
                queryData: {
                    keyWord: null, //搜索关键字
                    page: 1,
                    limit: 10
                },
                data: [],
                total: 0
            },

            tableCols: [
                {
                    key: 'AdminName',
                    label: '姓名'
                },
                {
                    key: 'Account',
                    label: '账号'
                },
                {
                    key: 'RoleName',
                    label: '角色'
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
            const { data, total } = await getPlatformAdminList(this.table.queryData);
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
	     * 添加角色
	     */
        showDialog ({ type }) {
            if (type === 'add') {
                this.$refs.AdminFormDialog.init({ title: '添加管理员' });
            }
        },

        /**
         * 注销平台管理员
         */
        delAdmin (AdminID) {
            this.$confirm('此操作将注销该管理员的账号, 是否继续?', '敏感操作提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true,
                type: 'warning'
            }).then(async () => {
                const { code } = await delPlatformAdmin(AdminID);
                if (code === 200) {
                    this.$message.success(this.$t('msg.remove_success'));
                    this.init();
                }
            });
        },

        /**
         * 修改管理员账号状态
         */
        updateAdmin (AdminID, Status) {
            this.$confirm(`此操作将${Status ? '禁用' : '启用'}该管理员的账号, 是否继续?`, '敏感操作提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true,
                type: 'warning'
            }).then(async () => {
                const { code } = await updatePlatformAdmin({ AdminID, Status });
                if (code === 200) {
                    this.$message.success(this.$t('msg.update_success'));
                    this.init();
                }
            });
        },

        /**
         * 跳转
         */
        linkTo ({ type, userId }) {
            switch (type) {
            case 'wallet':
                this.$router.push(`/public/info/userWallet/${userId}`); break;
            }
        }

    }
};
</script>
