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
                    <span v-if="col.key === 'operation' && scope.row.isAdmin !== 1">
                        <el-button type="primary" @click="showDialog ({ type:'setRole',adminId:scope.row.adminId,roleId:scope.row.roleId })">设置角色</el-button>
                        <el-button type="warning">重置密码</el-button>
                        <el-button v-if="scope.row.Status" type="warning" @click="updateAdmin(scope.row.adminId,0)">启用</el-button>
                        <el-button v-else type="warning" @click="updateAdmin(scope.row.adminId,1)">禁用</el-button>
                        <el-button type="danger" @click="delAdmin(scope.row.adminId)">注销</el-button>
                    </span>
                    <span v-if="col.key === 'RoleName'">
                        {{scope.row.isAdmin ? '超级管理员': scope.row[col.key] || '暂无'}}
                    </span>
                    <span v-else>{{scope.row[col.key]}}</span>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="table-pagination" @current-change="handleCurrentChange" :page-size="$store.state.config.pagination.size" :page-sizes="$store.state.config.pagination.pageSizes" :layout="$store.state.config.pagination.layout" :total="table.total">
        </el-pagination>
        <AdminFormDialog ref="AdminFormDialog" @refresh="init()" />
        <SetRoleFormDialog ref="SetRoleFormDialog" @refresh="init()" />
    </div>
</template>

<script>
import { getPlatformAdminList, updatePlatformAdmin, delPlatformAdmin } from '@/http';
import AdminFormDialog from './form/AdminFormDialog';
import SetRoleFormDialog from './form/SetRoleFormDialog';
export default {
    name: 'AdminManage',
    components: {
        AdminFormDialog,
        SetRoleFormDialog
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
                    key: 'adminName',
                    label: '姓名'
                },
                {
                    key: 'account',
                    label: '账号'
                },
                {
                    key: 'roleName',
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
        showDialog ({ type, adminId, roleId }) {
            if (type === 'add') {
                this.$refs.AdminFormDialog.init({ title: '添加管理员' });
            } else if (type === 'setRole') {
                this.$refs.SetRoleFormDialog.init({ title: '设置角色', adminId, roleId });
            }
        },

        /**
         * 注销平台管理员
         */
        delAdmin (adminId) {
            this.$confirm('此操作将注销该管理员的账号, 是否继续?', '敏感操作提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true,
                type: 'warning'
            }).then(async () => {
                const { code } = await delPlatformAdmin(adminId);
                if (code === 200) {
                    this.$message.success(this.$t('msg.remove_success'));
                    this.init();
                }
            });
        },

        /**
         * 修改管理员账号状态
         */
        updateAdmin (adminId, status) {
            this.$confirm(`此操作将${status ? '禁用' : '启用'}该管理员的账号, 是否继续?`, '敏感操作提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true,
                type: 'warning'
            }).then(async () => {
                const { code } = await updatePlatformAdmin({ adminId, status });
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
